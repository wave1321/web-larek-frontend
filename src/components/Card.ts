import { IProduct } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/Events";

export class Card extends Component<IProduct> {
    protected cardCategory: HTMLElement;
    protected cardTitle: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardPrice: HTMLElement;
    protected cardId: string;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container)
        this.cardCategory = ensureElement('.card__category', this.container);
        this.cardTitle = ensureElement('.card__title', this.container);
        this.cardImage = ensureElement('.card__image', this.container) as HTMLImageElement;
        this.cardPrice = ensureElement('.card__price', this.container);

        this.container.addEventListener('click', () => this.events.emit('card:modal', {id: this.cardId}));
    }

    set category(value: string) {
        this.setText(this.cardCategory, value);
    }

    set title(value: string) {
        this.setText(this.cardTitle, value);
    }

    set price(value: number) {
        this.setText(this.cardPrice, value);
    }

    set image(value: string) {
        this.setImage(this.cardImage, value);
    }

    set id(value: string) {
        this.cardId = value;
    }
}

export class FullCard extends Card { 
    protected cardText: HTMLElement;
    protected cardButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        this.cardText = ensureElement('.card__text', this.container);
        this.cardButton = ensureElement('.card__button', this.container) as HTMLButtonElement;
        this.cardButton.textContent = 'В корзину';
    }

    set text(value: string) {
        this.setText(this.cardText, value);
    }
}