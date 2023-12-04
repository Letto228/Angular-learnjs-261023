import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs';
import {FormControl} from '@angular/forms';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.productsStoreService.loadProducts(subCategoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );

    readonly control = new FormControl(10);

    counter = 10;

    // readonly products$ = this.activatedRoute.data.pipe(map(({products}) => products as IProduct[]));

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
        setTimeout(() => {
            // this.control.setValue(100);

            this.counter = 100;
            this.changeDetectorRef.markForCheck();
        }, 3000);

        // this.control.valueChanges.subscribe(v => {
        //     console.log('Check control value', v);
        // });
    }

    trackById(_index: number, {_id}: IProduct) {
        return _id;
    }
}
