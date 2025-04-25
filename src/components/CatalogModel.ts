import { ICatalogModel, IProduct } from "../types";
import { IEvents } from "./base/Events";

export class CatalogModel implements ICatalogModel {
    items: IProduct[] = [];

    preview: string | null;

    constructor(protected events: IEvents) {}

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    getProduct(id: string): IProduct {
        return this.items.find((item) => item.id === id)
    };
};