import { ApiListResponse } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { BasketModel } from './components/BasketModel';
import { Card, CompactCard, FullCard, GalleryCard } from './components/Card';
import { CatalogModel } from './components/CatalogModel';
import { Basket } from './components/common/Basket';
import { Modal } from './components/common/Modal';
import { LarekApi } from './components/LarekApi';
import { Page } from './components/Page';
import './scss/styles.scss';
import { IProduct } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();

const api = new LarekApi(CDN_URL, API_URL);

const catalogModel = new CatalogModel(events);
const basketModel = new BasketModel(events);

const galleryCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const fullCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const compactCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const page = new Page(document.querySelector('.page__wrapper') as HTMLElement, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);


api.getProducts()
    .then((data) => {
        catalogModel.setItems(data);
    })
    .then(() => events.emit('catalog:update'))
    .catch(err => console.log(err));

events.on('catalog:update', () => {
    const itemsHTMLArray = catalogModel.items.map(item => 
        new GalleryCard(cloneTemplate(galleryCardTemplate), events).render(item)
    )
    page.render({
        catalog: itemsHTMLArray
    })
});

events.on('card:modal', ({id}: {id: string}) => {
    const itemHTML = new FullCard(cloneTemplate(fullCardTemplate), events).render(catalogModel.getProduct(id))
    modal.render({
        content: itemHTML
    });
});

events.on('card_full:select', ({id}: {id: string}) => {
    const item = catalogModel.getProduct(id);
    basketModel.add(item);
    modal.close();
});

events.on('basket__item:remove', ({index}: {index: number}) => {
    basketModel.remove(index);
});

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
});

events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    }); 
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});