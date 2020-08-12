import { clsGood } from "../../../entity/clsGood";

export class AddToCartButtonComponent{
    document : HTMLDocument;

    constructor(document : HTMLDocument){
        this.document = document;
    }

    create(good: clsGood, onClickMethod: any): HTMLButtonElement{
        var addToCartButton: HTMLButtonElement = document.createElement("button");
        addToCartButton.innerHTML = 'افزودن به سبد خرید';
        addToCartButton.addEventListener("click", function(){
            onClickMethod(good);
          });
        return addToCartButton
    }
}