import { Component } from "../base/Component";
import { createElement, ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";


interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: number;
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('basket:confirm');
            });
        }

        this.selected = 0;
        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    get items(): HTMLElement[] {
        return Array.from(this._list.children) as HTMLElement[];
    }

    set selected(items: number) {
        if ((this.total > 0) && (items > 0) ) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }

    set total(value: number) {
        this.setText(this._total, String(value + ' синапсов'));
    }

    get total(): number {
        return (parseInt(this._total.textContent)) || 0;
    }
}