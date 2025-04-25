import { IProduct, TProductList } from "../types";
import { Api, ApiListResponse } from "./base/Api";
import { IEvents } from "./base/Events";

export interface ILarekApi {
    getProducts: () => Promise<IProduct[]>;
}

export class LarekApi extends Api implements ILarekApi {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string) {
        super(baseUrl);
        this.cdn = cdn
    }

    getProducts(): Promise<IProduct[]> {
        return this.get('/product/').then((data: ApiListResponse<IProduct>) => 
                data.items.map((item) => ({
                    ...item, 
                    image: this.cdn + item.image
                }))
        )
    }
}