export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IOrder {
    payType: string;
    address: string;
    mail: string;
    tel: string;
}

export interface ICatalogModel {
    items: IProduct[];
    preview: string | null;
    setItems(items: IProduct[]): void;
    getProduct(id: string): IProduct;
}

export interface IBasketModel {
    items: TProductInfo[];
    add(id: string): void;
    remove(id: string): void;
    reset(): void;
    checkPayValidation(data: Record<keyof IOrder, string>): boolean;
}

export interface IModal {
    templateId: string;
}

export interface IEventEmitter {
    emit: (event: string, data: unknown) => void;
}

export type TProductInfo = Pick<IProduct, 'id' | 'title' | 'price'>;