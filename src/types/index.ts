import { IEvents } from "../components/base/Events";

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
};

export interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
};

export interface ICatalogModel {
    items: IProduct[];
    preview: string | null;
    setItems(items: IProduct[]): void;
    getProduct(id: string): IProduct;
};

export interface IBasketModel {
    items: TProductInfo[];
    events: IEvents;
    add(item: TProductInfo): void;
    remove(id: string): void;
    hasItem(id: string): boolean;
    getTotal(): number;
    getIdList(): string[]
    reset(): void; 
};

export interface IOrderModel {
    orderInfo: Partial<TFullOrder>;
    events: IEvents;
    checkInfoValidation(): boolean;
    checkContactsValidation(): boolean;
};

export interface TProductList {
    total: number;
    items: IProduct[];
};

export type TProductInfo = Pick<IProduct, 'id' | 'title' | 'price'> & {
    index?: number;
};

export type TOrderInfo = Pick<IOrder, 'payment' | 'address'>;

export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>;

export type TFullOrder = TOrderInfo & TOrderContacts;

export type FormErrors = Partial<Record<keyof IOrder, string>>;