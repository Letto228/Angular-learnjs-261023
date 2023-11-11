import {Component} from '@angular/core';
import {IProductBuyInfo} from 'src/app/shared/products/product-buy-info.interface';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    productsList = productsMock;

    onProductBuy(productInfo: IProductBuyInfo) {
        // eslint-disable-next-line no-console
        console.log(`Buy product with id: ${productInfo.id}`);
    }
}
