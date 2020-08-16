export class removeListItemButtonComponent{
    document: HTMLDocument;
    removeFromCartButton : HTMLButtonElement;
    
    constructor(document: HTMLDocument){
        this.document = document;
        this.removeFromCartButton = this.create();
    }

    create():HTMLButtonElement{
        var removeFromCartButton : HTMLButtonElement = this.document.createElement('button');
        removeFromCartButton.innerText = 'حذف';
        return removeFromCartButton;
    }


}