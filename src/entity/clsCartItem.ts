
import {clsGood} from './clsGood';

export class clsCartItem {
    good: clsGood;
    count: number;

    constructor(good: clsGood, count: number) {
        this.good = good;
        this.count = count;
    }
}
