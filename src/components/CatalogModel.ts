import { ICatalogModel, IProduct } from "../types";
import { EventEmitter } from "./base/Events";

export class CatalogModel implements ICatalogModel {
    items: IProduct[] = [];

    constructor(protected events: EventEmitter) {}

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    getProduct(id: string): IProduct {
        return this.items.find((item) => item.id === id)
    };
};