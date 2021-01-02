import { clsPrice } from "../../../entity/clsPrice";

export class TotalPriceComponent{
    document : HTMLDocument;
    totalPriceComponent:HTMLLabelElement

    constructor(document: HTMLDocument){
        this.document = document;
        this.totalPriceComponent = this.create();
    }

    create(){
        var totlaPriceValue :HTMLLabelElement = this.document.createElement('label');
        totlaPriceValue.id = 'e__cartPanel__totalPriceValue';
        return totlaPriceValue;
    }

    update(value: number){
        this.totalPriceComponent.innerText = new clsPrice(value).format();
    }
}