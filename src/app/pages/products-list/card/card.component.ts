import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | undefined;

    @Output() readonly buyClick: EventEmitter<string> = new EventEmitter<string>();

    onProductBuy(event: MouseEvent) {
        event.stopPropagation();

        // eslint-disable-next-line no-console
        console.log('Btn buy click');

        if (this.product) {
            const {_id: id} = this.product;

            this.buyClick.emit(id);
        }
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
