
import {clsCartItem} from '../../../entity/clsCartItem';
import {removeListItemButtonComponent} from '../removeButton/removeListItemButton.cmp';

export class CartListItemComponent {
    document : HTMLDocument;
    cartListItem: HTMLLIElement;
    removeFromCartButton : HTMLButtonElement;
    onRemoveFromCartClickedMethod: any;

    constructor(document : HTMLDocument, cartItem: clsCartItem, onRemoveFromCartClickedMethod: any){
        this.document = document;
        this.onRemoveFromCartClickedMethod = onRemoveFromCartClickedMethod;
        this.cartListItem = this.create(cartItem);
    }


    private create(cartItem: clsCartItem):HTMLLIElement{
        var cartPnaleOL_LI: HTMLLIElement = this.document.createElement('li');
        cartPnaleOL_LI.id = 'e__cartPanel__cartList__cartItemList__' + cartItem.good.id.toString();

        this.removeFromCartButton =  new removeListItemButtonComponent(this.document).removeFromCartButton;
        this.removeFromCartButton.addEventListener('click',()=>{
            this.onRemoveFromCartClickedMethod(cartItem);
        },false)
        var image: HTMLImageElement = this.document.createElement('img');
        image.setAttribute("class","e__cartPanel__cartList__cartItemList__dd_img");
        var countSpan: HTMLSpanElement = this.document.createElement('span');
        var titleSpan : HTMLSpanElement = this.document.createElement('span');
        var priceSpan : HTMLSpanElement = this.document.createElement('span');

        

        image.src = cartItem.good.imageUrl;
        titleSpan.innerText = cartItem.good.title;
        countSpan.innerText = cartItem.count.toString();
        priceSpan.innerText = cartItem.good.price.format();

        var dl : HTMLDListElement = this.document.createElement('dl');
        dl.setAttribute("class","e__cartPanel__cartList__cartItemList__dd");

        var removeButton_dt : HTMLElement = this.document.createElement('dt');
        removeButton_dt.innerText = 'حذف';
        var removeButton_dd : HTMLElement = this.document.createElement('dd');
        removeButton_dd.appendChild(this.removeFromCartButton)

        dl.appendChild(removeButton_dt);
        dl.appendChild(removeButton_dd);


        var image_dt : HTMLElement = this.document.createElement('dt');
        image_dt.innerText = 'عکس';
        var image_dd: HTMLElement = this.document.createElement('dd');
        
        image_dd.appendChild(image)

        dl.appendChild(image_dt);
        dl.appendChild(image_dd);

        var title_dt : HTMLElement = this.document.createElement('dt');
        title_dt.innerText = 'عنوان';
        var title_dd: HTMLElement = this.document.createElement('dd');
        title_dd.innerText = cartItem.good.title;

        dl.appendChild(title_dt);
        dl.appendChild(title_dd);

        var count_dt : HTMLElement = this.document.createElement('dt');
        count_dt.innerText = 'تعداد';
        var count_dd: HTMLElement = this.document.createElement('dd');
        count_dd.innerText = cartItem.count.toString();

        dl.appendChild(count_dt);
        dl.appendChild(count_dd);

        var price_dt : HTMLElement = this.document.createElement('dt');
        price_dt.innerText = 'قیمت';
        var price_dd: HTMLElement = this.document.createElement('dd');
        price_dd.innerText = cartItem.good.price.format();

        dl.appendChild(price_dt);
        dl.appendChild(price_dd);




        cartPnaleOL_LI.appendChild(dl);
        
        return cartPnaleOL_LI;
    }
}