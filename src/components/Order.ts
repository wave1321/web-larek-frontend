import { TOrderContacts, TOrderInfo } from "../types";
import { ensureElement } from "../utils/utils";
import { EventEmitter, IEvents } from "./base/Events";
import { Form } from "./common/Form";


export class OrderInfo extends Form<TOrderInfo> {
    constructor (container: HTMLFormElement, events: IEvents) {
        super(container, events);
        

        (this.container.elements.namedItem('card') as HTMLButtonElement).addEventListener('click', () => {
            //this.events.emit('payment:change', 'Онлайн') 
            (this.container.elements.namedItem('card') as HTMLButtonElement).classList.remove('button_alt');
            (this.container.elements.namedItem('cash') as HTMLButtonElement).classList.add('button_alt');
        });

        (this.container.elements.namedItem('cash') as HTMLButtonElement).addEventListener('click', () => {
            //this.events.emit('payment:change', 'При получении')
            (this.container.elements.namedItem('card') as HTMLButtonElement).classList.add('button_alt');
            (this.container.elements.namedItem('cash') as HTMLButtonElement).classList.remove('button_alt');
        });
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).textContent = value
    }

    setCardButonCheck() {
        

    }

    setPaymentCheck(value: string) {
        if (value === 'Онлайн') {
            (this.container.elements.namedItem('card') as HTMLButtonElement).classList.remove('button_alt');
        } else {
            (this.container.elements.namedItem('card') as HTMLButtonElement).classList.add('button_alt');
        }

        if (value === 'При получении') {
            (this.container.elements.namedItem('cash') as HTMLButtonElement).classList.remove('button_alt');
        } else {
            (this.container.elements.namedItem('cash') as HTMLButtonElement).classList.add('button_alt');
        }
    }
}

export class OrderContacts extends Form<TOrderContacts> {

}