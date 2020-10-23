import { CartListComponent } from "../list/cartList.cmp";
import { TotalPriceComponent } from "../totalPrice/totalPrice.cmp";
import { clsCartItem } from "../../../entity/clsCartItem";

export class CartPanelComponent{
    document : HTMLDocument;
    cartListComponent : CartListComponent;
    totalPriceComponent : TotalPriceComponent;
    cartPanel : HTMLDivElement;
    checkoutButton : HTMLButtonElement;
    onRemoveFromCartClickedMethod : any;
    isVisible: Boolean;

    constructor(document : HTMLDocument, onRemoveFromCartClickedMethod : any){
        this.document = document;
        this.onRemoveFromCartClickedMethod = onRemoveFromCartClickedMethod;
        this.cartListComponent  = new CartListComponent(this.document, this.onRemoveFromCartClickedMethod);
        this.totalPriceComponent = new TotalPriceComponent(this.document);
        this.cartPanel = this.create();
        this.isVisible = false;
    }

    onRemoveFromCartClickedMethodInner(cartItem : clsCartItem):void{
            console.log('removed');
            console.log(cartItem);
            console.log(this);
            
    }

    
    create(): HTMLDivElement {
        var cartPanel: HTMLDivElement = document.createElement('div');
        cartPanel.id = 'e__cartPanel';
        cartPanel.setAttribute("class", "e__cartPanel_deactive");

        var cartPanelTitle : HTMLHeadingElement = document.createElement('h3');
        cartPanelTitle.innerText = 'سبد خرید شما';

        var cartPanelImg: HTMLDivElement = document.createElement('div');
        cartPanelImg.setAttribute("class", "e__cartPanel_img");


        var totalPriceTitle : HTMLHeadingElement = document.createElement('h4');
        totalPriceTitle.innerText = 'مجموع سفارش شما:';
        
        
        this.checkoutButton  = document.createElement('button');
        this.checkoutButton.innerText = 'تسویه حساب';

        cartPanel.appendChild(cartPanelTitle);
        cartPanel.appendChild(cartPanelImg);
        cartPanel.appendChild(this.cartListComponent.listWebComponent);
        cartPanel.appendChild(totalPriceTitle);
        cartPanel.appendChild(this.totalPriceComponent.totalPriceComponent);
        cartPanel.appendChild(this.checkoutButton);

        return cartPanel;
    }

    update(cartItemList: clsCartItem[]):void{
        this.cartListComponent.update(cartItemList);
        this.totalPriceComponent.update(this.calculateTotalPrice(cartItemList))
    }

    calculateTotalPrice(cartItemList: clsCartItem[]): number{
        var result : number = cartItemList.reduce(function(sum, cartItem){
            return sum + cartItem.good.price;
        },0)
        return result;
    }

    show():void{
        this.isVisible = true;
        this.cartPanel.setAttribute("class", "e__cartPanel_active");
    }

    hide():void{
        this.isVisible = false;
        this.cartPanel.setAttribute("class", "e__cartPanel_deactive");
    }

    toggleVisibility():void{
        if(this.isVisible == true){
            this.hide();
        }else{
            this.show();
        }
    }

}