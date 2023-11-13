import {Component, Input, Output, EventEmitter} from '@angular/core';
import {type IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input()
    product: IProduct | null = null;

    @Output()
    buyProduct = new EventEmitter<IProduct['_id']>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (this.product) {
            this.buyProduct.emit(this.product._id);
        }
    }

    isStarActive(starIndex: number): boolean {
        const rating = this.product?.rating ?? 0;

        return rating >= starIndex;
    }
}
