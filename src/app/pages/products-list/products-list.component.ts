import {Component, OnInit} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';
import {LoadDirection} from '../../shared/scroll-with-loading/load-direction';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
    private productsStore: IProduct[] | null = null;
    loadBorderOffset = 100;

    get products(): IProduct[] | null {
        // eslint-disable-next-line no-console
        // console.log('products getter');

        return this.productsStore;
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.productsStore = productsMock;
        }, 4000);
    }

    onLoad(loadDirection: LoadDirection) {
        // eslint-disable-next-line no-console
        console.log(loadDirection);
    }
}
