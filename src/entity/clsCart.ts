import {clsCartItem} from './clsCartItem';
import { clsGood } from './clsGood';

import {CartLocalStorageManager} from '../util/localStorage/cart.lcl';
import { clsPrice } from './clsPrice';

export class clsCart {
    cartItemList: clsCartItem[];
    totalPrice: clsPrice;
    isPanelVisible : boolean;
    userTitle: string;
    mobileNumber: string;
    shippingAddress: string;
    storeId: string;
    cartLocalStorageManager: CartLocalStorageManager;

    constructor(storeId){
        this.cartItemList = [];
        this.totalPrice = new clsPrice(0);
        this.isPanelVisible = false;
        this.storeId = storeId;
        this.cartLocalStorageManager = new CartLocalStorageManager(storeId);
    }

    updateCartFromLocalStorage(){
        this.cartItemList = this.cartLocalStorageManager.getCart()
    }

    addToCart(good : clsGood){
        var foundCartItemInList : clsCartItem = this.cartItemList.find(function(cartItem: clsCartItem){
            if(good.id == cartItem.good.id){
                return cartItem;
            }
        });
        if(!foundCartItemInList){
            var newCartItem = new clsCartItem(good, 1)
            this.cartItemList.push(newCartItem);
            this.cartLocalStorageManager.updateCart(this.cartItemList);
        }
    }

    removeFromCart(cartItem: clsCartItem){
        var newCartItemList : clsCartItem[]= this.cartItemList.filter(function(currentCartItem :clsCartItem){
            if(cartItem.good.id != currentCartItem.good.id){
                return cartItem;
            }
        })
        this.cartItemList = newCartItemList;
        this.cartLocalStorageManager.updateCart(this.cartItemList);
    }

    clearCart(){
        this.cartItemList = [];
        this.cartLocalStorageManager.updateCart(this.cartItemList);
    }

    togglePanel(){
        this.isPanelVisible = !this.isPanelVisible;
    }
}
