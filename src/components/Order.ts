import { TOrderContacts, TOrderInfo } from "../types";
import { EventEmitter } from "./base/Events";
import { Form } from "./common/Form";


export class OrderInfo extends Form<TOrderInfo> {
    protected orderPaymentButtons: HTMLButtonElement[] = [];

    constructor (container: HTMLFormElement, events: EventEmitter) {
        super(container, events);

        this.orderPaymentButtons =  this.container.querySelectorAll('button') as unknown as HTMLButtonElement[];

        (this.container.elements.namedItem('card') as HTMLButtonElement).addEventListener('click', () => {
            this.setButtonCheck('card');
            this.onInputChange('payment', 'Онлайн');
        });

        (this.container.elements.namedItem('cash') as HTMLButtonElement).addEventListener('click', () => {
            this.setButtonCheck('cash');
            this.onInputChange('payment', 'При получении');
        });

        this.setButtonCheck('card');
        this.onInputChange('payment', 'Онлайн');
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).textContent = value
    }

    setButtonCheck(value: string) {
        this.orderPaymentButtons.forEach((button) => {
            if (button.name === value) {
                this.toggleClass(button, 'button_alt', false);
            } else {
                this.toggleClass(button, 'button_alt', true);
            }
        })
    }
}

export class OrderContacts extends Form<TOrderContacts> {
    constructor (container: HTMLFormElement, events: EventEmitter) {
        super(container, events);
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).textContent = value
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).textContent = value
    }  
}