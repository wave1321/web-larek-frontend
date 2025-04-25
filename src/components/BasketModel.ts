import { IBasketModel, TProductInfo } from "../types";
import { IEvents } from "./base/Events";

export class BasketModel implements IBasketModel {
    items: TProductInfo[] = [];
    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    add(item: TProductInfo): void {
        this.items = [item, ...this.items];
        this.events.emit('basket:change');
    };

    remove(id: number): void {
        this.items = this.items.filter((item, index) => index !== id - 1);
        this.events.emit('basket:change');
    };

    getTotal(): number {
        return this.items.reduce((sum, {price}) => sum + price, 0);
    }

    confirm(): void {};
    reset(): void {}; 
}