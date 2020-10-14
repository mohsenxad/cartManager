export class CheckoutPanelComponent{
    document : HTMLDocument;
    shippingAddressInput : HTMLTextAreaElement;
    userTitleInput :HTMLInputElement;
    userMobileNumberInput: HTMLInputElement;
    checkoutPanel : HTMLDivElement;
    submitButton : HTMLButtonElement;

    constructor(document : HTMLDocument){
        this.document = document;
        this.checkoutPanel = this.create();
    }

    create():HTMLDivElement{
        var checkoutPanel: HTMLDivElement = document.createElement('div');
        checkoutPanel.id = 'e__checkoutPanel';
        checkoutPanel.setAttribute("class", "e__checkoutPanel_deactive");

        var checkoutForm : HTMLDivElement = document.createElement('div');
       

        var checkoutPanelTitle : HTMLHeadingElement = document.createElement('h3');
        checkoutPanelTitle.innerText = 'نهایی کردن سفارش';

        
        var userTitleLabel : HTMLLabelElement = document.createElement('label');
        userTitleLabel.innerText = 'نام و نام خانوادگی';

        this.userTitleInput  = this.document.createElement('input');
        this.userTitleInput.type = 'text';

        var mobileNumberLabel : HTMLLabelElement = document.createElement('label');
        mobileNumberLabel.innerText = 'شماره موبایل';

        this.userMobileNumberInput  = this.document.createElement('input');
        this.userMobileNumberInput.type = 'text';
        this.userMobileNumberInput.maxLength = 11;

        
        var shippingAddressLabel : HTMLLabelElement = document.createElement('label');
        shippingAddressLabel.innerText = 'آدرس'

        this.shippingAddressInput = this.document.createElement('textarea');

        this.submitButton = document.createElement('button');
        
        this.submitButton.innerText = 'ثبت';

        checkoutForm.appendChild(checkoutPanelTitle);

        checkoutForm.appendChild(userTitleLabel);
        checkoutForm.appendChild(this.userTitleInput);

        
        checkoutForm.appendChild(mobileNumberLabel);
        checkoutForm.appendChild(this.userMobileNumberInput);

        checkoutForm.appendChild(shippingAddressLabel);
        checkoutForm.appendChild(this.shippingAddressInput);

        checkoutForm.appendChild(this.submitButton);

        
        checkoutPanel.appendChild(checkoutForm);
        return checkoutPanel;
    }

    getUserTitle(): string{
        return this.userTitleInput.value;
    }

    getMobileNumber(): string{
        return this.userMobileNumberInput.value;
    }

    getShippingAddress(): string{
        return this.shippingAddressInput.value;
    }

    show():void{
        this.checkoutPanel.setAttribute("class", "e__checkoutPanel_active");
    }

    hide():void{
        this.checkoutPanel.setAttribute("class", "e__checkoutPanel_deactive");
    }


}
