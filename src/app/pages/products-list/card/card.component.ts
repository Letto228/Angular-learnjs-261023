import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | any;
    @Output() productBuy: EventEmitter<IProduct> = new EventEmitter<IProduct>();

    onProductBuy(event: Event, product: IProduct) {
        event.stopPropagation();
        this.productBuy.emit(product);
    }

    isStarActive(starIndex: number): boolean {
        return this.product.rating >= starIndex;
    }
}
