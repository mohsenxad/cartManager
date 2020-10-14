import { reject } from 'lodash';
import {clsCart} from '../entity/clsCart';
import { clsOrder } from '../entity/clsOrder';

export class OrderService{
    submitOrder(cart: clsCart): Promise<clsOrder>{
        console.log(cart);
        var submitOrderUrl: string = 'http://api_window_store.befrooshim.com/order/create';
        var data = {
            storeId: cart.storeId ,
            mobileNumber: cart.mobileNumber,
            address: cart.shippingAddress,
            orderItemList: cart.cartItemList
        };
        return new Promise((resolve, reject)=>{
          this.postData(submitOrderUrl, data)
          .then(function(response){
            console.log(response);
            resolve(new clsOrder('1'));
            
          })
          .catch(function(err){
            reject(err);
          })
        })
    }

    private postData(url: string, data: any): Promise<XMLHttpRequest>{
        var request: XMLHttpRequest= new XMLHttpRequest();
        return new Promise(function(resolve, reject){

          request.open("POST",url, true);
          request.setRequestHeader("Content-Type","application/json");
          request.onreadystatechange = function () {
      
            // Only run if the request is complete
            if (request.readyState !== 4) return;
      
            // Process the response
            if (request.status == 200) {
              // If successful
              resolve(request);
            } else {
              // If failed
              reject({
                status: request.status,
                statusText: request.statusText
              });
            }
      
          };

          
          request.send(JSON.stringify(data));
        })

       


      }

}