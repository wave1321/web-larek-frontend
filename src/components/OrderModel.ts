import { IOrderModel, TOrderContacts, TOrderInfo } from "../types";
import { EventEmitter } from "./base/Events";

export class OrderModel implements IOrderModel {
        protected info: TOrderInfo;
        protected contacts: TOrderContacts;
        events: EventEmitter;

        constructor(events: EventEmitter) {
            this.events = events
            this.orderInfo = { address: '', payment: 'Онлайн' };
            this.orderContacts = { phone: '', email: '' };
        };

        set orderInfo(data: TOrderInfo) {
            this.info = data;
        };

        get orderInfo() {
            return this.info;
        }

        set orderContacts(data: TOrderContacts) {
            this.contacts = data;
        };

        get orderContacts() {
            return this.contacts;
        };

        checkInfoValidation(data: Record<keyof TOrderInfo, string>): boolean {
            return true
        };

        checkContactsValidation(data: Record<keyof TOrderContacts, string>): boolean {
            return true
        };
}