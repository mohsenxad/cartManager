import { clsCart } from "../../entity/clsCart";

export class OrderValidator{
    isValid(cart: clsCart){
        var result = {
            isValid: true,
            messageList:[],
        };

        if(cart.cartItemList.length==0){
            result.isValid = false;
            result.messageList.push('سبد خرید شما خالی میباشد.ابتدا سفارش خود را کامل کنید.')
        }

        if(!cart.userTitle){
            result.isValid = false;
            result.messageList.push('نام و نام خانوادگی خود را وارد کنید.');
        }

        if(
            cart.userTitle &&
            cart.userTitle.length < 3
        ){
            result.isValid = false;
            result.messageList.push('نام و نام خانوادگی خود را به صورت کامل وارد کنید.')
        }

        if(!cart.mobileNumber){
            result.isValid = false;
            result.messageList.push('شماره موبایل خود را وارد کنید.')
        }

        if(
            cart.mobileNumber &&
            cart.mobileNumber.length != 11

        ){
            result.isValid = false;
            result.messageList.push('شماره موبایل میبایست 11 رقم باشد');
        }

        if(
            cart.mobileNumber &&
            cart.mobileNumber.length == 11 &&
            !cart.mobileNumber.startsWith('09')
        ){
            result.isValid = false;
            result.messageList.push('شماره موبایل میبایست با 09 شروع شود.');
        }


        if(!cart.shippingAddress){
            result.isValid = false;
            result.messageList.push('آدرس دریافت سفارش را وارد کنید');
        }

        if(
            cart.shippingAddress &&
            cart.shippingAddress.length < 10
        ){
            result.isValid = false;
            result.messageList.push('آدرس دریافت سفارش را همراه بااسم استان و شهر و جزئییات وارد کنید.')
        }

        
        return result;
    }
}