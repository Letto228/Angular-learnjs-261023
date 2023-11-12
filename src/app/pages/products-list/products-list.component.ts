import {Component} from '@angular/core';
import {IPurchasedProduct} from 'src/app/shared/products/purchased-product.interface';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products = productsMock;

    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }

    onBuyProductClick(event: IPurchasedProduct) {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
