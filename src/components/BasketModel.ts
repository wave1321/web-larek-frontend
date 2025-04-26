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

    remove(id: string): void {
        this.items = this.items.filter((item) => item.id !== id );
        this.events.emit('basket:change');
    };

    hasItem(id: string): boolean {
        return this.items.some((item) => item.id === id );
    }

    getTotal(): number {
        return this.items.reduce((sum, {price}) => sum + price, 0);
    }

    confirm(): void {};

    reset(): void {
        this.items = [];
        this.events.emit('basket:change');
    }; 
}