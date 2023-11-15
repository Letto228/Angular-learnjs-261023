import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    // readonly product = productsMock[0];

    @Input()
    productList: IProduct[] | undefined;

    @Output()
    productId: EventEmitter<string> = new EventEmitter<string>();

    onProductBuy(event: Event, id: string) {
        event.stopPropagation();

        this.productId.emit(id);
    }

    isStarActive(starIndex: number, rating: number): boolean {
        return rating >= starIndex;
    }
}
