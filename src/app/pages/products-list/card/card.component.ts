import {Component, Input, Output, EventEmitter} from '@angular/core';
import type {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product!: IProduct;

    @Output() buyClick: EventEmitter<string> = new EventEmitter();

    onProductBuy(event: MouseEvent) {
        event.stopPropagation();

        this.buyClick.emit(this.product._id);
    }

    isStarActive(starIndex: number): boolean {
        return this.product.rating >= starIndex;
    }
}
