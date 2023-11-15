import {Component} from '@angular/core';
import {productMock} from "../../../shared/products/product.mock";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly product = productMock;
    rating = this.product.rating;
    ratingArray = Array(this.rating).fill(0);

    onClickBuyProduct() {
        console.log('Купить продукт, в компоненте card');
    }
}
