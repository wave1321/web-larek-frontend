import { FormErrors, IOrderModel, TFullOrder } from "../types";
import { inputErrorsMessage } from "../utils/constants";
import { EventEmitter } from "./base/Events";

export class OrderModel implements IOrderModel {
        protected info: Partial<TFullOrder>;
        formErrors: FormErrors;
        events: EventEmitter;

        constructor(events: EventEmitter) {
            this.events = events;
            this.reset();
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
            const errors: typeof this.formErrors = {};

            this.info[field] = value;

            Object.keys(this.info).forEach((item: keyof TFullOrder) => {
                if (!this.info[item]) {
                    errors[item] = inputErrorsMessage[item];
                }

                this.formErrorsChange(errors);
            });
        }

        formErrorsChange(errors: FormErrors) {
            this.formErrors = errors;
            this.events.emit('formErrors:change', this.formErrors);
            return Object.keys(errors).length === 0;
        }

        reset() {
            this.info = { address: '', payment: 'Онлайн', phone: '', email: '' };
            this.formErrors = {};
        }
}