import { EventEmitter } from './components/base/Events';
import { BasketModel } from './components/BasketModel';
import { CompactCard, FullCard, GalleryCard } from './components/Card';
import { CatalogModel } from './components/CatalogModel';
import { Basket } from './components/common/Basket';
import { Modal } from './components/common/Modal';
import { LarekApi } from './components/LarekApi';
import { OrderContacts, OrderInfo } from './components/Order';
import { OrderModel } from './components/OrderModel';
import { Page } from './components/Page';
import { Success } from './components/Success';
import './scss/styles.scss';
import { IOrder, TFullOrder } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

// Создаем брокер событий
const events = new EventEmitter();

// Создаем экземпляр api с указанием адресов CDN и сервера
const api = new LarekApi(CDN_URL, API_URL);

// Создаем экземпляры классов данных
const catalogModel = new CatalogModel(events);
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);

// Записываем все возможные темплейты
const galleryCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const fullCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const compactCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderInfoTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Создаем экземпляры классов представления
const page = new Page(document.querySelector('.page__wrapper') as HTMLElement, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderInfoForm = new OrderInfo(cloneTemplate<HTMLFormElement>(orderInfoTemplate), events);
const orderContactsForm = new OrderContacts(cloneTemplate<HTMLFormElement>(orderContactsTemplate), events);

// Получаем данные продуктов от сервера
api.getProducts()
    .then((data) => {
        catalogModel.setItems(data);
    })
    .then(() => events.emit('catalog:update'))
    .catch(err => console.log(err));

// Обновление каталога с продуктми
events.on('catalog:update', () => {
    const itemsHTMLArray = catalogModel.items.map(item => 
        new GalleryCard(cloneTemplate(galleryCardTemplate), events).render(item)
    )
    page.render({
        catalog: itemsHTMLArray
    })
});

// Открытие модального окна при нажатии на карточку каталога
events.on('card:modal', ({id}: {id: string}) => {
    const product = catalogModel.getProduct(id);
    const itemHTML = new FullCard(cloneTemplate(fullCardTemplate), 
        events, basketModel.hasItem(id), (!product.price))
        .render(product)
    modal.render({
        content: itemHTML
    });
});

// Добавление товара в корзину
events.on('card_full:select', ({id}: {id: string}) => {
    const item = catalogModel.getProduct(id);
    basketModel.add(item);
    modal.close();
});

// Удаление товара из корзины
events.on('basket__item:remove', ({id}: {id: string}) => {
    basketModel.remove(id);
});

// Изменение содержания корзины
events.on('basket:change', () => {
    const count = basketModel.items.length;
    page.counter = count;
    basket.items = basketModel.items.map((item, index) => {
        const card = new CompactCard(cloneTemplate(compactCardTemplate), events);
        return card.render({
            id: item.id,
            title: item.title,
            price: item.price,
            index: index + 1
        });
    })
    basket.total = basketModel.getTotal();
    basket.selected = count;
});

// Открытие корзины
events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    }); 
});

// Подтверждение корзины и переход на страницу оформления заказа
events.on('basket:confirm', () => {
    const orderInfo = orderModel.orderInfo;
    const infoValid = (!orderInfo.address) ? false : true;
    modal.render({
        content: orderInfoForm.render({
            address: orderInfo.address,
            valid: infoValid,
            errors: []
        })
    });
});

// Подтверждение информации заказа и переход на страницу контактов заказа
events.on('order:submit', () => {
    const orderInfo = orderModel.orderInfo;
    const infoValid = ((!orderInfo.email) || (!orderInfo.phone))? false : true;
    modal.render({
        content: orderContactsForm.render({
            email: orderInfo.email,
            phone: orderInfo.phone,
            valid: infoValid,
            errors: []
        })
    });
});

// Изменение состояния валидации форм
events.on('formErrors:change', (errors: Partial<TFullOrder>) => {
    const { address, email, phone } = errors;
    orderInfoForm.valid = !address;
    orderInfoForm.errors = Object.values({address}).join();
    orderContactsForm.valid = !email && !phone;
    orderContactsForm.errors = Object.values({phone, email}).filter(i => !!i).join('; ');   
});

// Изменение одного из полей форм
events.on('order:change', (data: { field: keyof TFullOrder, value: string }) => {
    orderModel.setOrderField(data.field, data.value);
});

// Отправка заказа на сервер и переход на страницу успешной покупки
events.on('contacts:submit', () => {
    const readyOrders: IOrder = {
        ...orderModel.getOrderInfo(), 
        total: basketModel.getTotal(),
        items: basketModel.getIdList()
    };
    console.log(readyOrders);
    api.postOrder(readyOrders)
        .then(res => {
            const success = new Success(cloneTemplate(successTemplate), {
                onClick: () => { modal.close() }
            });
            modal.render({
                content: success.render({ total: res.total })
            });
        })
        .then(() => {
            orderModel.reset();
            basketModel.reset();
            orderContactsForm.reset();
            orderInfoForm.reset();
            orderInfoForm.setButtonCheck('card');
        })
        .catch(err => console.log(err));
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});