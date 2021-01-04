export class ErrorListItemComponent {
    document: HTMLDocument;
    errorListItem: HTMLLIElement;

    constructor(document: HTMLDocument, errorMessageText: string){
        this.document = document;
        this.errorListItem = this.create(errorMessageText);
    }

    private create(errorMessageText: string): HTMLLIElement{
        var cartPnaleOL_LI: HTMLLIElement = this.document.createElement('li');
        cartPnaleOL_LI.innerText = errorMessageText;
        return cartPnaleOL_LI;
    }
}