import {Component, OnInit} from '@angular/core';
import {LoadDirection} from '../../shared/app-scroll-with-loading/constants';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
    private productsStore: IProduct[] | null = null;

    get products(): IProduct[] | null {
        // eslint-disable-next-line no-console
        // console.log('products getter');

        return this.productsStore;
    }

    onLoad(event: LoadDirection) {
        // eslint-disable-next-line no-console
        console.log('debug: event', event);
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.productsStore = productsMock;
        }, 4000);
    }
}
