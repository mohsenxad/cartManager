import {clsCartItem} from './clsCartItem';
import { clsGood } from './clsGood';

export class clsCart {
    cartItemList: clsCartItem[];
    totalPrice: number;
    isPanelVisible : boolean;

    constructor(){
        this.cartItemList = [];
        this.totalPrice = 0;
        this.isPanelVisible = false;
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
        }
    }

    removeFromCart(cartItem: clsCartItem){
        var newCartItemList : clsCartItem[]= this.cartItemList.filter(function(currentCartItem :clsCartItem){
            if(cartItem.good.id != currentCartItem.good.id){
                return cartItem;
            }
        })
        this.cartItemList = newCartItemList;
    }

    togglePanel(){
        this.isPanelVisible = !this.isPanelVisible;
    }
}
