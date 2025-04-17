import { IEvents } from "../components/base/events";

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
    add(id: string): void;
    remove(id: string): void;
    confirm(): IOrder;
    reset(order: TOrderResponse): void; 
};

export interface IOrderModel {
    orderInfo: TOrderInfo;
    orderStage: number;
    events: IEvents;
    set primary(data: TOrderPrimaryInfo);
    set secondary(data: TOrderSecondaryInfo);
    get info(): TOrderInfo;
    checkPayValidation(data: Record<keyof TOrderInfo, string>): boolean;
};

export type TProductInfo = Pick<IProduct, 'id' | 'title' | 'price'>;

export type TOrderPrimaryInfo  = Pick<IOrder, 'payment' | 'address'>;

export type TOrderSecondaryInfo  = Pick<IOrder, 'email' | 'phone'>; 

export type TOrderInfo = TOrderPrimaryInfo & TOrderSecondaryInfo;

export type TOrderResponse = Pick<IOrder, 'total'> & {
    id: string;
};