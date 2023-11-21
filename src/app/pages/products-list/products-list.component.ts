import {Component, OnInit} from '@angular/core';
import {LoadDirection} from 'src/app/shared/appscrollwithloading/load-direction.enum';
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

    ngOnInit(): void {
        setTimeout(() => {
            this.productsStore = productsMock;
        }, 4000);
    }

    onLoad(loadDirection: LoadDirection) {
        // eslint-disable-next-line no-console
        console.log('Loading, LoadDirection is ', loadDirection);
    }
}
