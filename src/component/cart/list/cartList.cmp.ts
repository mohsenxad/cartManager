import { clsCartItem } from "../../../entity/clsCartItem";
import { CartListItemComponent } from "../listItem/cartListItem.cmp";

export class CartListComponent {
    document : HTMLDocument;
    listWebComponent: HTMLOListElement

    constructor(document : HTMLDocument){
        this.document = document;
        this.listWebComponent = this.create();
    }
    
    create(): HTMLOListElement{
        var cartPanelOLElemet:HTMLOListElement = document.createElement('ol');
        cartPanelOLElemet.id = 'e__cartPanel__cartList';
        return cartPanelOLElemet;
    }

    update(cartItemList: clsCartItem[] , onRemoveClickMethod:any):void {
        while (this.listWebComponent.firstChild) {
            this.listWebComponent.removeChild(this.listWebComponent.firstChild);
        }

        cartItemList.forEach(function(cartItem:clsCartItem){
            var cartListComponent: HTMLLIElement  = new CartListItemComponent(document).create(cartItem, function(){onRemoveClickMethod(cartItem);})
            this.listWebComponent.appendChild(cartListComponent)

        }, this);
    }


}