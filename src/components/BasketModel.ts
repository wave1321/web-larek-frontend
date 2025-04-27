import { IBasketModel, TProductInfo } from "../types";
import { EventEmitter } from "./base/Events";

export class BasketModel implements IBasketModel {
    protected _items: TProductInfo[] = [];
    events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    set items(items: TProductInfo[]) {
        this._items = items;
    }

    get items(): TProductInfo[] {
        return this._items;
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

    getIdList(): string[] {
        return this.items.map(({id}) => id);
    }

    getTotal(): number {
        return this.items.reduce((sum, {price}) => sum + price, 0);
    }

    reset(): void {
        this.items = [];
        this.events.emit('basket:change');
    }; 
}