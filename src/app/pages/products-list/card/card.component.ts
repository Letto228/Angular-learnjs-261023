import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly product = productMock;

    onBuyClick(event: MouseEvent) {
        // eslint-disable-next-line no-console
        console.log('onBuyClick');
        event.stopPropagation();
    }
}
