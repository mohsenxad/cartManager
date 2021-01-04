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

    constructor(document : HTMLDocument){
        this.document = document;
        this.cartPlaceHolder = this.getCartPlaceHolder();
        
        this.cartPlaceHolder.setAttribute("class","e__cartManager");
        this.cartBannerComponent = new CartBannerComponent(this.document);
        this.cartBannerComponent.banner.addEventListener('click', ()=>{
            this.onBannerClicked();
        })
        this.cartPanelComponent = new CartPanelComponent(this.document, this.onRemoveCartItemButtonClick.bind(this), this.onClearCartClicked.bind(this));
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

        this.fetchFromLocalStorage();
    }

    fetchFromLocalStorage(){
        this.cartBannerComponent.updateCounter(this.cart.cartItemList.length);
        this.cartPanelComponent.update(this.cart.cartItemList);
    }


    getCartPlaceHolder(): HTMLElement {
        var cartPanel: HTMLElement = this.document.querySelector('cartPanel');
        if (cartPanel) {
            var shopApiStoreId =  cartPanel.getAttribute("shop_api_store_id");
            if(shopApiStoreId){
                this.cart = new clsCart(shopApiStoreId);
                console.log('init cartManager for storID :' + shopApiStoreId);
                this.cart.updateCartFromLocalStorage();
                return cartPanel;
            }else{
                console.log('لطفا برای تگ <cartPanel shop_api_store_id="<shopApiStoreId>"></cartPanle> مقدار shop_api_store_id را ثبت کنید');
            }

        }
        else {
            console.log('لطفا در جای مناسب تگ <cartPanel shop_api_store_id="<shopApiStoreId>"></cartPanel> را اضافه کنید.');
        }
    }


    onBannerClicked(): void{
        this.cart.togglePanel();
        console.log('banner clicked');
        this.cartPanelComponent.toggleVisibility();
        this.checkoutPanelComponent.hide();
        this.receiptComponent.hide();
    }

    onCheckOutClicked(): void{
        this.cartPanelComponent.toggleVisibility();
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
            this.checkoutPanelComponent.errorPanle.update(validationResult.messageList);
        }
    }



    insertAddToCartButtonToHTML(): void{
        var goodListItemWebComponentList = this.document.querySelectorAll('shopApigoodListItem');
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

    onClearCartClicked():void{
        this.cart.clearCart();
        this.cartBannerComponent.updateCounter(this.cart.cartItemList.length);
        this.cartPanelComponent.update(this.cart.cartItemList);
    }

    hi(){
        console.log('Hi store');
        console.log(this);

    }

}
