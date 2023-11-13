import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product?: IProduct = undefined;

    @Output() readonly buyClick: EventEmitter<string> = new EventEmitter();

    onProductBuy(event: Event) {
        event.stopPropagation();
        this.buyClick.emit(this.product?._id);

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
