export class ReceiptComponent{
    document : HTMLDocument;
    receiptPanel : HTMLDivElement;
    finishButton : HTMLButtonElement;

    constructor(document : HTMLDocument){
        this.document = document;
        this.receiptPanel = this.create();
    }

    create(){
        var receiptPanel: HTMLDivElement = document.createElement('div');
        receiptPanel.id = 'e__receipt';
        receiptPanel.setAttribute("class", "e__receipt_deactive");


        var receiptBoxImg : HTMLButtonElement = document.createElement('button');
        receiptBoxImg.innerText = '×';

        var headerImg : HTMLDivElement = document.createElement('div');
        headerImg.setAttribute("class", "e__receipt_img");


        var title : HTMLHeadingElement = document.createElement('h3');
        title.innerText = 'سفارش شما با موفقیت ثبت شد';

        var description : HTMLParagraphElement = document.createElement('p');
        description.innerText = 'از سفارش شما متشکریم. برای هماهنگی زمان ارسال با شما تماس خواهیم گرفت';

        var finishButton : HTMLButtonElement = document.createElement('button');
        finishButton.innerText = 'باشه';
        this.finishButton = finishButton;

        receiptPanel.appendChild(headerImg);
        receiptPanel.appendChild(title);
        receiptPanel.appendChild(description);
        receiptPanel.appendChild(finishButton);

        return receiptPanel;
    }

    show():void{
        this.receiptPanel.setAttribute("class", "e__receipt_active");
    }

    hide():void{
        this.receiptPanel.setAttribute("class", "e__receipt_deactive");
    }
}