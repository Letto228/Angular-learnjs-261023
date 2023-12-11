import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, take, tap} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {IProduct} from '../../shared/products/product.interface';
import {BrandsService} from '../../shared/brands/brands.service';
import {getFilterFromQuery} from './query-params/get-filter-from-query';
import {IProductsFilterQueryParams} from './query-params/products-filter-query-params.interface';
import {IProductsFilter} from './filter/products-filter.interface';
import {getQueryFromFilter} from './query-params/get-query-from-filter';
import {IState} from '../../store/reducer';
import {selectProducts} from '../../store/products/products.selectors';
import {loadProducts} from '../../store/products/products.actions';

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
            this.store$.dispatch(loadProducts(subCategoryId));
        }),
        switchMap(() => this.store$.pipe(select(selectProducts))),
    );

    readonly brands$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.brandsService.loadBrands(subCategoryId);
        }),
        switchMap(() => this.brandsService.brands$),
    );

    readonly initialFilter$ = this.activatedRoute.queryParams.pipe(
        take(1),
        map(queryParams => getFilterFromQuery(queryParams as IProductsFilterQueryParams)),
    );

    readonly searchName$ = this.activatedRoute.queryParamMap.pipe(
        map(queryParamMap => queryParamMap.get('name')),
    );

    constructor(
        // private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly brandsService: BrandsService,
        private readonly router: Router,
        private readonly store$: Store<IState>,
    ) {
        // this.store$
        //     .pipe(
        //         // map(state => state[PRODUCTS_FEATURE]),
        //         // distinctUntilChanged(),
        //         select(selectProducts),
        //     )
        //     .subscribe(console.log);
    }

    onFilterChange(filter: IProductsFilter) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: getQueryFromFilter(filter),
        });
    }

    trackById(_index: number, {_id}: IProduct) {
        return _id;
    }
}
