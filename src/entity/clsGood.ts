import { clsPrice } from "./clsPrice";

export class clsGood {
    id: string;
    title: string;
    price: clsPrice;
    imageUrl: string;

    constructor(id: string, title: string, price: number, imageUrl: string) {
        this.id = id;
        this.title = title;
        this.price = new clsPrice(price);
        this.imageUrl = imageUrl;
    }
}
