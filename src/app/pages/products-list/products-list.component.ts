import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    productsMock = productsMock;
    onCardClick(product: IProduct) {
        const {name} = product || {};

        // eslint-disable-next-line no-console
        console.log(`${name} добавлен в корзину`);
    }
}
