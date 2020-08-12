export class cartBannerCounterComponent {
    docuemnt : HTMLDocument;

    constructor(docuemnt : HTMLDocument){
        this.docuemnt = document;
    }

    create() : HTMLSpanElement{
        var counter: HTMLSpanElement = document.createElement('span');
        counter.id = 'e__banner__counter';
        return counter;
    }
}