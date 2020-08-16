import { clsGood } from "../../../entity/clsGood";

export class AddToCartButtonComponent{
    document : HTMLDocument;
    addToCartButton:HTMLButtonElement;

    constructor(document : HTMLDocument, good: clsGood){
        this.document = document;
        this.addToCartButton = this.create(good);
    }

    create(good: clsGood): HTMLButtonElement{
        var addToCartButton: HTMLButtonElement = document.createElement("button");
        addToCartButton.innerHTML = 'افزودن به سبد خرید';
        return addToCartButton
    }
}