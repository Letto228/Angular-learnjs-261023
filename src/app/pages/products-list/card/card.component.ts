import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | undefined = undefined;

    @Output() readonly productBuyClick = new EventEmitter<string>();

    onProductBuy(event: Event) {
        event.stopPropagation();
        this.productBuyClick.emit(this.product?._id);

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        return !!(this.product && this.product.rating >= starIndex);
    }
}
