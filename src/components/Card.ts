import { IProduct, TProductInfo } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/Events";

export class Card<T> extends Component<T> {
    protected cardTitle: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardId: string;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container)
        this.cardTitle = ensureElement('.card__title', this.container);
        this.cardPrice = ensureElement('.card__price', this.container);  
    }

    set title(value: string) {
        this.setText(this.cardTitle, value);
    }

    set price(value: number) {
        this.setText(this.cardPrice, value ? value + ' синапсов' : 'Бесценно');
    }

    set id(value: string) {
        this.cardId = value;
    }
}

export class GalleryCard extends Card<IProduct> {
    protected cardCategory: HTMLElement;
    protected cardImage: HTMLImageElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        this.cardCategory = ensureElement('.card__category', this.container);
        this.cardImage = ensureElement('.card__image', this.container) as HTMLImageElement;

        this.container.addEventListener('click', () => this.events.emit('card:modal', {id: this.cardId}));
    }

    set category(value: string) {
        this.setText(this.cardCategory, value);
    }

    set image(value: string) {
        this.setImage(this.cardImage, value);
    }

}

export class FullCard extends GalleryCard { 
    protected cardText: HTMLElement;
    protected cardButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: EventEmitter, inBasket: boolean = false, nullPrice: boolean) {
        super(container, events);
        this.cardText = ensureElement('.card__text', this.container);
        this.cardButton = ensureElement('.card__button', this.container) as HTMLButtonElement;
        if (!nullPrice) {
            if (!inBasket) { 
                this.cardButton.textContent = 'В корзину'
                this.cardButton.addEventListener('click', () => this.events.emit('card_full:select', {id: this.cardId}));
            } else {
                this.cardButton.textContent = 'Удалить'
                this.cardButton.addEventListener('click', () => this.events.emit('basket__item:remove', {id: this.cardId}));
            }
        } else {
            this.cardButton.textContent = 'Не продается!'
        }
    }

    set text(value: string) {
        this.setText(this.cardText, value);
    }
}

export class CompactCard extends Card<TProductInfo> {
    protected cardIndex: HTMLElement;
    protected cardButton: HTMLButtonElement;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        this.cardIndex = ensureElement('.basket__item-index', this.container);
        this.cardButton = ensureElement('.card__button', this.container) as HTMLButtonElement;

        this.cardButton.addEventListener('click', () => this.events.emit('basket__item:remove', {id: this.cardId}));
    }

    set index(value: number) {
        this.cardIndex.textContent = String(value);
    }

    get index(): number {
        return parseInt(this.cardIndex.textContent);
    }
}