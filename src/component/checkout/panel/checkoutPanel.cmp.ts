export class CheckoutPanelComponent{
    document : HTMLDocument;

    constructor(document : HTMLDocument){
        this.document = document;
    }

    create():HTMLDivElement{
        var checkoutPanel: HTMLDivElement = document.createElement('div');
        checkoutPanel.id = 'e__checkoutPanel';

        var checkoutForm : HTMLFormElement = document.createElement('form');
        
        

        var checkoutPanelTitle : HTMLHeadingElement = document.createElement('h3');
        checkoutPanelTitle.innerText = 'نهایی کردن سفارش';

        var userTitleLabel : HTMLLabelElement = document.createElement('label');
        userTitleLabel.innerText = 'نام و نام خانوادگی';

        var userTitleInput :HTMLInputElement = document.createElement('input');
        userTitleInput.type = 'text';

        var shippingAddressLabel : HTMLLabelElement = document.createElement('label');
        shippingAddressLabel.innerText = 'آدرس'

        var shippingAddressInput : HTMLTextAreaElement = document.createElement('textarea');

        var submitButton : HTMLButtonElement = document.createElement('button');
        submitButton.innerText = 'ثبت';

        checkoutForm.appendChild(checkoutPanelTitle);

        checkoutForm.appendChild(userTitleLabel);
        checkoutForm.appendChild(userTitleInput);

        checkoutForm.appendChild(shippingAddressLabel);
        checkoutForm.appendChild(shippingAddressInput);

        checkoutForm.appendChild(submitButton);

        
        checkoutPanel.appendChild(checkoutForm);
        return checkoutPanel;
    }

}
