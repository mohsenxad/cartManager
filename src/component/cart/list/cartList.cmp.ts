import { clsCartItem } from "../../../entity/clsCartItem";
import { CartListItemComponent } from "../listItem/cartListItem.cmp";

export class CartListComponent {
    document : HTMLDocument;
    listWebComponent: HTMLOListElement;
    onRemoveFromCartClickedMethod: any;

    constructor(document : HTMLDocument, onRemoveFromCartClickedMethod: any){
        this.document = document;
        this.listWebComponent = this.create();
        this.onRemoveFromCartClickedMethod = onRemoveFromCartClickedMethod;
    }
    
    create(): HTMLOListElement{
        var cartPanelOLElemet:HTMLOListElement = document.createElement('ol');
        cartPanelOLElemet.id = 'e__cartPanel__cartList';
        return cartPanelOLElemet;
    }

    update(cartItemList: clsCartItem[]):void {
        while (this.listWebComponent.firstChild) {
            this.listWebComponent.removeChild(this.listWebComponent.firstChild);
        }

        cartItemList.forEach((cartItem:clsCartItem) => {
            var cartListComponent: HTMLLIElement  = new CartListItemComponent(document,cartItem, this.onRemoveFromCartClickedMethod).cartListItem;
            this.listWebComponent.appendChild(cartListComponent)

        });
    }


}