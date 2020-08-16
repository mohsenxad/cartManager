import {clsCart} from '../entity/clsCart';

export class OrderService{
    submitOrder(cart: clsCart, onSuccessMethod: any){
        console.log(cart);
        var submitOrderUrl: string = 'https://api_window_store.befrooshim.com/order/create';
        var data = {
            storeId: cart.storeId ,
            mobileNumber: cart.mobileNumber,
            address: cart.shippingAddress,
            orderItemList: cart.cartItemList
        };
        this.postData(submitOrderUrl, data, onSuccessMethod);
    }

    private postData(url: string, data: any, onSuccessMethod: any){
        var request: XMLHttpRequest= new XMLHttpRequest();
        request.open("POST",url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onreadystatechange = function () {
          if (request.readyState != 4 || request.status != 200) return;
          onSuccessMethod(request);
        };
        request.send(JSON.stringify(data));
      }
}