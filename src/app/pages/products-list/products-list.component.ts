import {Component} from '@angular/core';
import {productsMock} from 'src/app/shared/products/products.mock';
import {type IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products = productsMock;

    onCardClick(productId: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log('Card click', productId);
    }
}
