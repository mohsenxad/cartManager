export class clsPrice{
    value: number;

    constructor(value: number){
        this.value = value;
    }

    format(): string{
        return this.value.toLocaleString();
    }


}