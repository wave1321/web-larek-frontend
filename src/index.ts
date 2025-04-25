import { ApiListResponse } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { Card, FullCard } from './components/Card';
import { CatalogModel } from './components/CatalogModel';
import { Modal } from './components/common/Modal';
import { LarekApi } from './components/LarekApi';
import { Page } from './components/Page';
import './scss/styles.scss';
import { IProduct } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();
const catalogModel = new CatalogModel(events);

const api = new LarekApi(CDN_URL, API_URL);
const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const fullCardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const page = new Page(document.querySelector('.page__wrapper') as HTMLElement, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

api.getProducts()
    .then((data) => {
        catalogModel.setItems(data);
    })
    .then(() => events.emit('catalog:update'))
    .catch(err => console.log(err));

events.on('catalog:update', () => {
    const itemsHTMLArray = catalogModel.items.map(item => new Card(cloneTemplate(cardTemplate), events).render(item))
    page.render({
        catalog: itemsHTMLArray
    }
    )
});

events.on('card:modal', ({id}: {id: string}) => {
    const itemHTML = new FullCard(cloneTemplate(fullCardTemplate), events).render(catalogModel.getProduct(id))
    modal.render({
        content: itemHTML
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