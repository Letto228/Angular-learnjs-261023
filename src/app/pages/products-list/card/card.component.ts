import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product?: IProduct;
    @Output() readonly productBuy: EventEmitter<string> = new EventEmitter();

    onProductBuy(event: Event) {
        event.stopPropagation();

        // eslint-disable-next-line no-console
        // console.log('Buy product from card');
        this.productBuy.emit(this.product?._id);
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
