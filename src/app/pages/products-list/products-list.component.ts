import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }

    buyClick(event: string) {
        // eslint-disable-next-line no-console
        console.log(event);
    }

    readonly productList = productsMock;
    product = this.productList[5];
}
