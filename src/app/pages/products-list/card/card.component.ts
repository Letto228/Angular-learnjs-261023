import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | undefined;

    @Output() readonly productBuy = new EventEmitter<IProduct['_id']>();

    get productImage(): string | undefined {
        return this.product?.images[0].url;
    }

    onProductBuyClick(event: Event) {
        event.stopPropagation();

        if (!this.product) {
            console.error('Product data not set');

            return;
        }

        this.productBuy.emit(this.product._id);
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
