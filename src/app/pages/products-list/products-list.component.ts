import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {BrandsService} from '../../shared/brands/brands.service';
import {IProductsFilter} from './filter/products-filter.interface';
import {makeQueryParams} from './utils/make-query-params';
import {parseQueryParams} from './utils/parse-query-params';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    readonly products$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.productsStoreService.loadProducts(subCategoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );

    productsFilter: IProductsFilter | null = null;

    readonly brands$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.brandsService.loadBrands(subCategoryId);
        }),
        switchMap(() => this.brandsService.brands$),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly brandsService: BrandsService,
        private readonly router: Router,
        private readonly cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.listenQueryParamsChange();
    }

    trackById(_index: number, {_id}: IProduct) {
        return _id;
    }

    listenQueryParamsChange() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.productsFilter = parseQueryParams(params) as IProductsFilter;
            this.cdr.markForCheck();
        });
    }

    updateProductsFilter(productsFilter: IProductsFilter) {
        this.router.navigate([''], {
            relativeTo: this.activatedRoute,
            queryParams: makeQueryParams(productsFilter),
        });
    }
}
