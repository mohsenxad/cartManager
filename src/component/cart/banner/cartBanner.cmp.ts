import {cartBannerCounterComponent} from '../counter/cartBannerCounter.cmp';

export class CartBannerComponent {
    document: HTMLDocument;
    counterComponent: HTMLSpanElement;
    banner: HTMLDivElement;

    constructor(document: HTMLDocument) {
        this.document = document;
        this.counterComponent = new cartBannerCounterComponent(this.document).create();
        this.banner = this.create();
    }

    create(): HTMLDivElement {
        var banner: HTMLDivElement = document.createElement('div');


        var cart: HTMLSpanElement = document.createElement('span');
        cart.setAttribute("class", "e__banner_img");

        banner.appendChild(cart);
        cart.innerText = 'سبد خرید';
        banner.id = 'e__banner__'
        banner.appendChild(this.counterComponent);
        return banner;
    }

    updateCounter(count: number): void {
        this.counterComponent.innerText = count.toString() + ' ' + 'محصول ';
    }


}