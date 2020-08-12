import { clsCartItem } from "../../../entity/clsCartItem";

export class removeListItemButtonComponent{
    document: HTMLDocument;
    
    constructor(document: HTMLDocument){
        this.document = document;
    }

    create(cartItem: clsCartItem, onClickMethod:any){
        var removeFromCartButton : HTMLButtonElement = this.document.createElement('button');
        removeFromCartButton.innerText = 'حذف';
        removeFromCartButton.addEventListener("click", function(){
            onClickMethod(cartItem);
        });
        return removeFromCartButton;
    }


}