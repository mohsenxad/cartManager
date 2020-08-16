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
        cartManger = new CartManager(document, '5d33094bbc80bc2f6a69a931');
    }
)

