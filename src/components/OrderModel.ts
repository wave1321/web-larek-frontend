import { FormErrors, IOrderModel, TFullOrder, TOrderContacts, TOrderInfo } from "../types";
import { EventEmitter } from "./base/Events";

export class OrderModel implements IOrderModel {
        protected info: Partial<TFullOrder>;
        formErrors: FormErrors = {};
        events: EventEmitter;

        constructor(events: EventEmitter) {
            this.events = events
            this.orderInfo = { address: '', payment: 'Онлайн', phone: '', email: '' };
        };

        set orderInfo(data: Partial<TFullOrder>) {
            this.info = data;
        };

        get orderInfo() {
            return this.info;
        }

        getOrderInfo(): TFullOrder {
            return this.info as TFullOrder;
        }

        setOrderField(field: keyof TFullOrder, value: string) {
            this.info[field] = value;

            if (this.checkInfoValidation()) {
                this.checkContactsValidation()
            } 
        }

        checkInfoValidation() {
            const errors: typeof this.formErrors = {};
            if (!this.info.address) {
                errors.address = 'Необходимо указать адрес';
            }
            return this.formErrorsChange(errors)
        }

        checkContactsValidation(): boolean {
            const errors: typeof this.formErrors = {};
            if (!this.info.email) {
                errors.email = 'Необходимо указать email';
            }
            if (!this.info.phone) {
                errors.phone = 'Необходимо указать телефон';
            }
            return this.formErrorsChange(errors);
        };

        formErrorsChange(errors: FormErrors) {
            this.formErrors = errors;
            this.events.emit('formErrors:change', this.formErrors);
            return Object.keys(errors).length === 0;
        }

        reset() {
            this.info = { address: '', payment: 'Онлайн', phone: '', email: '' };
            this.formErrors = {};
            this.events.emit('order:change', {});
        }
}