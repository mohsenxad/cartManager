import { CartListComponent } from "../list/cartList.cmp";
import { TotalPriceComponent } from "../totalPrice/totalPrice.cmp";
import { clsCartItem } from "../../../entity/clsCartItem";

export class CartPanelComponent{
    document : HTMLDocument;
    cartListComponent : CartListComponent;
    totalPriceComponent : TotalPriceComponent;

    constructor(document : HTMLDocument){
        this.document = document;
        this.cartListComponent  = new CartListComponent(this.document);
        this.totalPriceComponent = new TotalPriceComponent(this.document);
    }

    
    create(onCheckoutClickMethod:any): HTMLDivElement {
        var cartPanel: HTMLDivElement = document.createElement('div');
        cartPanel.id = 'e__cartPanel';

        var cartPanelTitle : HTMLHeadingElement = document.createElement('h3');
        cartPanelTitle.innerText = 'سبد خرید شما';
       
        var totalPriceTitle : HTMLHeadingElement = document.createElement('h4');
        totalPriceTitle.innerText = 'مجموع سفارش شما:';
        
        
        var checkoutButton : HTMLButtonElement = document.createElement('button');
        checkoutButton.addEventListener('click',function(){onCheckoutClickMethod()})
        checkoutButton.innerText = 'تسویه حساب';

        cartPanel.appendChild(cartPanelTitle);
        cartPanel.appendChild(this.cartListComponent.listWebComponent);
        cartPanel.appendChild(totalPriceTitle);
        cartPanel.appendChild(this.totalPriceComponent.totalPriceComponent);
        cartPanel.appendChild(checkoutButton);

        return cartPanel;
    }

    update(cartItemList: clsCartItem[] , onRemoveClickMethod:any):void{
        this.cartListComponent.update(cartItemList, onRemoveClickMethod);
        this.totalPriceComponent.update(this.calculateTotalPrice(cartItemList))
    }

    calculateTotalPrice(cartItemList: clsCartItem[]): number{
        var result : number = cartItemList.reduce(function(sum, cartItem){
            return sum + cartItem.good.price;
        },0)
        return result;
    }

}