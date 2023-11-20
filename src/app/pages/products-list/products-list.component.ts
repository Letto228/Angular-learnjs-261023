import {Component, OnInit} from '@angular/core';
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

    set product(data: {value: IProduct; direction: string}) {
        const {value, direction} = data;

        if (value && this.productsStore) {
            if (direction === 'addTop') {
                this.productsStore = [value, ...this.productsStore];
            } else if (direction === 'addBottom') {
                this.productsStore = [...this.productsStore, value];
            }
        }
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.productsStore = productsMock;
        }, 4000);
    }

    onLoad(event: string): void {
        if (event) {
            this.product = {value: productsMock[0], direction: event};
        }
    }
}
