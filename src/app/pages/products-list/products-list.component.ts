import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    products: IProduct[] | null = null;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.products = productsMock;
            this.changeDetectorRef.markForCheck();
        }, 4000);
    }

    trackById(_index: number, {_id}: IProduct) {
        return _id;
    }
}
