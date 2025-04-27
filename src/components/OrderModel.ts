import { FormErrors, IOrderModel, TFullOrder } from "../types";
import { inputErrorsMessage } from "../utils/constants";
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
            console.log('this.info::: ', this.info);
            //errors.email = '';
            const errors: typeof this.formErrors = {};
            Object.keys(this.info).forEach((item: keyof TFullOrder) => {
                
                /*console.log('item::: ', item);
                console.log('this.info[item]::: ', this.info[item]);*/
                
                if (!this.info[item]) {
                    errors[item] = inputErrorsMessage[item];
                    console.log(errors, '.', item, ' = ', inputErrorsMessage[field]);
                    
                }
                /*console.log('errors::: ', errors);*/
                this.formErrorsChange(errors);
            });
            
            
            /*if (this.checkInfoValidation(field)) {
                this.checkContactsValidation(field)
            } */
        }

       /*checkInfoValidation(value: string) {
            const errors: typeof this.formErrors = {};
            if (!this.info.address) {
                errors.address = inputErrorsMessage[value];
            }
            return this.formErrorsChange(errors)
        }

        checkContactsValidation(value: string): boolean {
            const errors: typeof this.formErrors = {};
            if (!this.info.email) {
                errors.email = inputErrorsMessage[value];
            }
            if (!this.info.phone) {
                errors.phone = inputErrorsMessage[value];
            }
            return this.formErrorsChange(errors);
        };*/

        formErrorsChange(errors: FormErrors) {
            this.formErrors = errors;
            this.events.emit('formErrors:change', this.formErrors);
            console.log('errors::: ', this.formErrors);
            return Object.keys(errors).length === 0;
        }

        reset() {
            this.info = { address: '', payment: 'Онлайн', phone: '', email: '' };
            this.formErrors = {};
        }
}