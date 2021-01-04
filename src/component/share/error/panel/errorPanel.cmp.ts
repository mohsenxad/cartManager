import { ErrorListComponent } from "../list/errorList.cmp";

export class ErrorPanelComponent {
    document: HTMLDocument;
    errorPanel: HTMLDivElement;
    errorListComponent : ErrorListComponent;

    constructor(document: HTMLDocument){
        this.document = document;
        this.errorListComponent = new ErrorListComponent(document);
        this.errorPanel = this.create();
    }

    create(): HTMLDivElement {
        var result: HTMLDivElement = this.document.createElement('div');
        result.id = 'e__errorPanel';
        result.appendChild(this.errorListComponent.listWebComponent);
        return result;
    }

    update(errorItemList: string[]):void{
        if(errorItemList.length==0){
            //TODO
            // remove the base div element with display none
        }else{
            this.errorListComponent.update(errorItemList);            
        }
        
    }
}