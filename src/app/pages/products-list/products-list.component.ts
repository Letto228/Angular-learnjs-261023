import {Component} from '@angular/core';
import { productsMock } from 'src/app/shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';


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

    onBuyClick(_id: IProduct['_id']) {
        console.log(_id);
        
    }
}
