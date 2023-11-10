import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    private readonly product = productMock;
    protected imgSrc = this.product.images[0].url;
    protected title = this.product.name;
    protected price = this.product.price;

    onBuyClickHandler(event: MouseEvent) {
        console.log('Buy');
        event.stopPropagation();
    }
}
