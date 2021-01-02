import { clsCartItem } from "../../entity/clsCartItem";
import { clsGood } from "../../entity/clsGood";

export class CartLocalStorageManager{
    storeId: string;
    cartStorageKey: string;

    constructor(storeId){
        this.storeId = storeId;
        this.cartStorageKey = storeId+'_cart';
    }
    updateCart(cartItemList: clsCartItem[]){
        console.log(cartItemList);
        localStorage.setItem(this.cartStorageKey,JSON.stringify(cartItemList));
    }

    getCart(){
        var cartItemList: clsCartItem[] = [];
        var cartJsonContetn: Array<any> = JSON.parse(localStorage.getItem(this.cartStorageKey));
        if(cartJsonContetn){
            cartJsonContetn.forEach(cartJson =>{
                cartItemList.push(new clsCartItem(new clsGood(cartJson.good.id, cartJson.good.title, cartJson.good.price,cartJson.good.imageUrl),cartJson.count));
            })
        }
        
        console.log(cartItemList);
        return cartItemList;
        
    }


}