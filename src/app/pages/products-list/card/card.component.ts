import {Component, Input, Output, EventEmitter} from '@angular/core';
import type {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | null = null;

    @Output() readonly productBuy = new EventEmitter<string>();

    onProductBuy(event: MouseEvent) {
        event.stopPropagation();

        this.productBuy.emit(this.product?._id);
    }

    isStarActive(starIndex: number): boolean {
        return this.product?.rating ? this.product.rating >= starIndex : false;
    }
}
