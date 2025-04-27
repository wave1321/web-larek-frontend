import { TOrderContacts, TOrderInfo } from "../types";
import { IEvents } from "./base/Events";
import { Form } from "./common/Form";


export class OrderInfo extends Form<TOrderInfo> {
    constructor (container: HTMLFormElement, events: IEvents) {
        super(container, events);

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
        this.container.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
            if (button.name === value) {
                button.classList.remove('button_alt');
            } else {
                button.classList.add('button_alt');
            }
        })
    }
}

export class OrderContacts extends Form<TOrderContacts> {
    constructor (container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).textContent = value
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).textContent = value
    }  
}