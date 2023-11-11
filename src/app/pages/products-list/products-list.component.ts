import {Component} from '@angular/core';
import {IProduct} from '../../shared/products/product.interface';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products?: IProduct[] = productsMock;
    productTrash: Set<string> = new Set<string>();

    onCardClick() {
        // eslint-disable-next-line no-console
        // console.log('Card click');
    }

    onProductBuy(productId: string) {
        this.productTrash.add(productId);
        // eslint-disable-next-line no-console
        console.log('Selected product ids: ', this.productTrash.values());
    }
}
