import { clsGood } from "../entity/clsGood";
import { AddToCartButtonComponent } from "../component/cart/addButton/addToCartButton.cmp";
import { clsCart } from "../entity/clsCart";
import { clsCartItem } from "../entity/clsCartItem";
import { CartBannerComponent } from "../component/cart/banner/cartBanner.cmp";
import { CartPanelComponent } from "../component/cart/panel/cartPanel.cmp";
import { CheckoutPanelComponent } from "../component/checkout/panel/checkoutPanel.cmp";
import { OrderValidator } from "../util/validators/order.vld";
import { OrderService } from "../service/order.srv";
import { ReceiptComponent } from "../component/checkout/receipt/receipt.cmp";
import { clsOrder } from "../entity/clsOrder";

export class CartManager{
    document : HTMLDocument;
    cart: clsCart;
    cartPlaceHolder: HTMLElement;
    cartBannerComponent: CartBannerComponent;
    cartPanelComponent: CartPanelComponent;
    checkoutPanelComponent: CheckoutPanelComponent;
    receiptComponent: ReceiptComponent;
    
    constructor(document : HTMLDocument, storeId: string){
        this.document = document;
        this.cart = new clsCart(storeId);
        this.cartPlaceHolder = this.getCartPlaceHolder();
        this.cartPlaceHolder.setAttribute("class","e__cartManager");
        this.cartBannerComponent = new CartBannerComponent(this.document);
        this.cartBannerComponent.banner.addEventListener('click', ()=>{
            this.onBannerClicked();
        })
        this.cartPanelComponent = new CartPanelComponent(this.document, this.onRemoveCartItemButtonClick.bind(this));
        this.cartPanelComponent.checkoutButton.addEventListener('click',()=>{
            this.onCheckOutClicked();
        })
        this.checkoutPanelComponent = new CheckoutPanelComponent(this.document);
        this.checkoutPanelComponent.submitButton.addEventListener('click', ()=>{
            this.onOrderSubmitClicked();
        })
        this.receiptComponent = new ReceiptComponent(this.document);
        this.insertAddToCartButtonToHTML();
        this.cartPlaceHolder.appendChild(this.cartBannerComponent.banner);
        this.cartPlaceHolder.appendChild(this.cartPanelComponent.cartPanel);
        this.cartPlaceHolder.appendChild(this.checkoutPanelComponent.checkoutPanel);
        this.cartPlaceHolder.appendChild(this.receiptComponent.receiptPanel);
    }
    

    getCartPlaceHolder(): HTMLElement {
        var cartPanel: HTMLElement = this.document.querySelector('cartPanel');
        if (cartPanel) {
            return cartPanel;
        }
        else {
            console.log('No Cart Panel Element Found');
        }
    }


    onBannerClicked(): void{
        this.cart.togglePanel();
        console.log('banner clicked');
        this.cartPanelComponent.toggleVisibility();
    }

    onCheckOutClicked(): void{
        console.log('checkout clicked');
        this.cartPanelComponent.hide();
        this.checkoutPanelComponent.show();
    }

    onSubmitOrderSuceess(order: clsOrder):void{
        console.log(order);
        this.receiptComponent.show();
        this.checkoutPanelComponent.hide();
    }

    onOrderSubmitClicked(){
        this.cart.userTitle = this.checkoutPanelComponent.getUserTitle();
        this.cart.mobileNumber = this.checkoutPanelComponent.getMobileNumber();
        this.cart.shippingAddress = this.checkoutPanelComponent.getShippingAddress(); 
    
        var validationResult = new OrderValidator().isValid(this.cart);
    
        if(validationResult.isValid){
            new OrderService()
            .submitOrder(this.cart)
            .then((createdOrder: clsOrder)=>{
                this.onSubmitOrderSuceess(createdOrder)
            })
            .catch((err) => {
                console.log(err);
            })
        }else {
            console.log(validationResult.messageList);
        }
    }

    

    insertAddToCartButtonToHTML(): void{
        var goodListItemWebComponentList = this.document.querySelectorAll('goodListItem');
        goodListItemWebComponentList.forEach((goodListItemWebComponent: HTMLElement) => {
            var currentGood = new clsGood(
                goodListItemWebComponent.getAttribute("id"),
                goodListItemWebComponent.getAttribute("title"),
                parseInt(goodListItemWebComponent.getAttribute("price")),
                goodListItemWebComponent.getAttribute("imageUrl")
            );
            this.insertAddToCartButtonToElement(goodListItemWebComponent, currentGood);
        })
    }

    insertAddToCartButtonToElement(goodListItemWebComponent: HTMLElement, good: clsGood){
        var addToCartButton: HTMLButtonElement = new AddToCartButtonComponent(document, good).addToCartButton;
        addToCartButton.addEventListener('click', ()=>{
            console.log('asd');
            
            this.addToCartButtonClicked(good);
        })
        goodListItemWebComponent.appendChild(addToCartButton);
    }

    addToCartButtonClicked(good: clsGood){
        this.cart.addToCart(good);
        this.cartBannerComponent.updateCounter(this.cart.cartItemList.length);
        this.cartPanelComponent.update(this.cart.cartItemList);
    }

    onRemoveCartItemButtonClick(cartItem: clsCartItem):void{
        this.cart.removeFromCart(cartItem);
        this.cartBannerComponent.updateCounter(this.cart.cartItemList.length);
        this.cartPanelComponent.update(this.cart.cartItemList);
    }

    hi(){
        console.log('Hi store');
        console.log(this);
        
    }

}