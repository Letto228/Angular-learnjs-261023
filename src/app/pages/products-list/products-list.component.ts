import {Component, Input} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    @Input() products: IProduct[] = productsMock;

    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }

    onProductAddedToCart(event: IProduct['_id']) {
        // eslint-disable-next-line no-alert
        alert(`Product added to cart: ${event}`);
    }

    trackByProducts(index: number, product: IProduct): IProduct['_id'] {
        return product._id;
    }
}
