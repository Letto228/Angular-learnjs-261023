import {Component} from '@angular/core';
import {productsMock} from 'src/app/shared/products/products.mock';
import type {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    products = productsMock;

    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }

    addToCart(productId: string) {
        const product = this.products.find(({_id}) => _id === productId);

        if (!product) {
            return;
        }

        // eslint-disable-next-line no-console
        console.log('Add to cart product', product);
    }

    trackByFn(_: number, product: IProduct) {
        return product._id;
    }
}
