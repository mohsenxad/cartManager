import {cartBannerCounterComponent} from '../counter/cartBannerCounter.cmp';

export  class CartBannerComponent{
    document : HTMLDocument;
    counterComponent: HTMLSpanElement;

    constructor(document : HTMLDocument){
        this.document = document;
        this.counterComponent = new cartBannerCounterComponent(this.document).create();
    }

    create(onClickMethod: any): HTMLDivElement{
        var banner: HTMLDivElement = document.createElement('div');
        banner.innerText = 'سبد خرید';
        banner.id = 'e__banner__'
        banner.addEventListener('click', function(){
            onClickMethod();
        });
        banner.appendChild(this.counterComponent);
        return banner;
    }

    updateCounter(count: number): void{
        this.counterComponent.innerText = count.toString();
    }


}