import { ErrorListItemComponent } from "../listItem/errorListItem.cmp";

export class ErrorListComponent {
    document: HTMLDocument;
    listWebComponent: HTMLOListElement;

    constructor(document: HTMLDocument){
        this.document = document;
        this.listWebComponent = this.create();
    }
    
    create(): HTMLOListElement{
        var cartPanelOLElemet:HTMLOListElement = document.createElement('ol');
        cartPanelOLElemet.id = 'e__errorPanel__cartList';
        return cartPanelOLElemet;
    }

    update(errorItemList: string[]):void{
        while (this.listWebComponent.firstChild) {
            this.listWebComponent.removeChild(this.listWebComponent.firstChild);
        }

        errorItemList.forEach((errorItem:string) => {
            var errorListComponent: HTMLLIElement  = new ErrorListItemComponent(document,errorItem).errorListItem;
            this.listWebComponent.appendChild(errorListComponent)

        });
    }
}