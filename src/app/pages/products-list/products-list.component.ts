import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

/**
 * Mark Dirty:
 * 1. Input changed
 * 2. DOM Event listener
 * 3. ChangeDetectorRef.markForCheck().
 */

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    private productsStore: IProduct[] | null = null;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    get products(): IProduct[] | null {
        // eslint-disable-next-line no-console
        // console.log('products getter');

        return this.productsStore;
    }

    get data(): string {
        // eslint-disable-next-line no-console
        console.log('Data calculated');

        return 'Yes, data';
    }

    ngOnInit(): void {
        // setInterval(() => {}, 1000);
        setTimeout(() => {
            this.productsStore = productsMock;
            this.changeDetectorRef.markForCheck();
        }, 4000);
        // setTimeout(() => {
        //     // this.productsStore = productsMock.map(item => ({...item, feedbacksCount: 2}));
        //     productsMock.forEach(item => {
        //         item.feedbacksCount = 2;
        //     });
        //     this.productsStore = [...productsMock];
        // }, 6000);
    }

    trackById(_index: number, {_id}: IProduct) {
        return _id;
    }
}
