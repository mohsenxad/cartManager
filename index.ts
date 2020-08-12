import {clsGood} from './src/entity/clsGood';
import {clsCartItem} from './src/entity/clsCartItem';
import {clsCart} from './src/entity/clsCart';

var cart = new clsCart();

import {AddToCartButtonComponent} from './src/component/cart/addButton/addToCartButton.cmp';
import {CartBannerComponent} from './src/component/cart/banner/cartBanner.cmp';
import { CartPanelComponent } from './src/component/cart/panel/cartPanel.cmp';
import { CheckoutPanelComponent } from './src/component/checkout/panel/checkoutPanel.cmp';


var cartBannerComponent: CartBannerComponent = new CartBannerComponent(document);
var cartPanelComponent: CartPanelComponent = new CartPanelComponent(document);
var checkoutPanelComponent: CheckoutPanelComponent = new CheckoutPanelComponent(document);

function insertAddToCartButtonToHTML(): void{
    var goodListItemWebComponentList = document.querySelectorAll('goodListItem');
    goodListItemWebComponentList.forEach(function(goodListItemWebComponent: HTMLElement){
        var currentGood = new clsGood(
            goodListItemWebComponent.getAttribute("id"),
            goodListItemWebComponent.getAttribute("title"),
            parseInt(goodListItemWebComponent.getAttribute("price")),
            goodListItemWebComponent.getAttribute("imageUrl")
        );
        insertAddToCartButtonToElement(goodListItemWebComponent, currentGood);
    })
}

function insertAddToCartButtonToElement(goodListItemWebComponent: HTMLElement, good: clsGood){
    var addToCartButton: HTMLButtonElement = new AddToCartButtonComponent(document).create(good, addToCartButtonClicked);
    goodListItemWebComponent.appendChild(addToCartButton);
}

function addToCartButtonClicked(good: clsGood){
    cart.addToCart(good);
    cartBannerComponent.updateCounter(cart.cartItemList.length);
    cartPanelComponent.update(cart.cartItemList, onRemoveCartItemButtonClick);
}



function onBannerClicked(){
    cart.togglePanel();
    console.log('clicked');
    
}

function onCheckOutClicked(){
    console.log('checkout');
    
}


function onRemoveCartItemButtonClick(cartItem: clsCartItem){
    cart.removeFromCart(cartItem);
    cartBannerComponent.updateCounter(cart.cartItemList.length);
    cartPanelComponent.update(cart.cartItemList, onRemoveCartItemButtonClick);
}



function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

docReady(init)

function getCartPlaceHolder(): HTMLElement {
    var cartPanel: HTMLElement = document.querySelector('cartPanel');
    if (cartPanel) {
        return cartPanel;
    }
    else {
        console.log('No Cart Panel Element Found');
    }
}

function init(): void{
    insertAddToCartButtonToHTML();
    
    getCartPlaceHolder().appendChild(cartBannerComponent.create(onBannerClicked));
    getCartPlaceHolder().appendChild(cartPanelComponent.create(onCheckOutClicked));
    getCartPlaceHolder().appendChild(checkoutPanelComponent.create());
}