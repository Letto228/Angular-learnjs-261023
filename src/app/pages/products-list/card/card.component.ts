import {Component, EventEmitter, Input, Output} from '@angular/core';
// import { IProduct } from 'src/app/shared/products/product.interface';
import { IProduct } from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | null = null;

    @Output() readonly buyClick = new EventEmitter<IProduct['_id']>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if(this.product !== null) {            
            this.buyClick.emit(this.product?._id);
        }
    }

    isStarActive(starIndex: number): boolean {
        return !!(this.product && this.product.rating >= starIndex);
    }
}
