export class ReceiptComponent{
    document : HTMLDocument;
    receiptPanel : HTMLDivElement;

    constructor(document : HTMLDocument){
        this.document = document;
        this.receiptPanel = this.create();
    }

    create(){
        var receiptPanel: HTMLDivElement = document.createElement('div');
        receiptPanel.id = 'e__receipt';
        receiptPanel.setAttribute("class", "e__receipt_deactive");

        var title : HTMLHeadingElement = document.createElement('h3');
        title.innerText = 'سفارش شما با موفقیت ثبت شد';

        var description : HTMLParagraphElement = document.createElement('p');
        description.innerText = 'از سفارش شما متشکریم. برای هماهنگی زمان ارسال با شما تماس خواهیم گرفت';

        var finishButton : HTMLButtonElement = document.createElement('button');
        finishButton.innerText = 'باشه';

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