import {Component, Input} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | undefined;

    addToCart(event: Event) {
        event.stopPropagation();
        console.warn('Add to cart', this.product?._id);
    }
}
