import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, takeUntil, tap} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {BrandsService} from '../../shared/brands/brands.service';
import {IProductsFilter} from './filter/products-filter.interface';
import {IProductsQueryParams} from './filter/products-filter-query-params.interface';
import {DestroyService} from '../../shared/destroy/destroy.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class ProductsListComponent implements OnInit {
    productFilter: IProductsQueryParams | undefined;

    readonly products$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.productsStoreService.loadProducts(subCategoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );

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
        private readonly destroy$: DestroyService,
    ) {}

    ngOnInit(): void {
        this.subscribeOnQueryParamMap();
    }

    trackById(_index: number, {_id}: IProduct) {
        return _id;
    }

    onChangeFilter(filter: IProductsFilter) {
        // eslint-disable-next-line no-console
        // console.log(filter);
        this.productFilter = {
            name: filter.name,
            brands: filter.brands,
            priceMin: filter.priceRange.min,
            priceMax: filter.priceRange.max,
        };
        this.router.navigate(['products-list'], {
            queryParams: this.productFilter,
        });
    }

    private subscribeOnQueryParamMap() {
        this.activatedRoute.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
            this.productFilter = {
                name: params.get('name') || '',
                brands: params.getAll('brands'),
                priceMin: Number(params.get('priceMin')),
                priceMax: Number(params.get('priceMax')),
            };
        });
    }
}
