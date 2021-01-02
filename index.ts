import './cartManager.scss';
import { CartManager } from './src/manager/cart.mngr';


function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

var cartManger: CartManager;



docReady(
    function(){
        cartManger = new CartManager(document);
        window.CartManager = cartManger;
    }
)

declare global {
    interface Window { CartManager: CartManager;}
}

