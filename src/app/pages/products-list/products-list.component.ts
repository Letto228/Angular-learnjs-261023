import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {BrandsService} from '../../shared/brands/brands.service';
import {IProductsFilter} from './filter/products-filter.interface';

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

    readonly brands$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.brandsService.loadBrands(subCategoryId);
        }),
        switchMap(() => this.brandsService.brands$),
    );

    filter: IProductsFilter = {};

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly brandsService: BrandsService,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {
        const filterJSON = this.activatedRoute.snapshot.queryParamMap.get('filter');

        if (!filterJSON) {
            return;
        }

        try {
            this.filter = JSON.parse(filterJSON);
        } catch (error: unknown) {
            console.warn(error);
        }
    }

    trackById(_index: number, {_id}: IProduct) {
        return _id;
    }

    changeFilter(filter: IProductsFilter) {
        const hasValues = Object.values(filter).find(value => value);

        this.router.navigate(['/'], {
            queryParams: {
                filter: hasValues ? JSON.stringify(filter) : undefined,
            },
        });
        this.filter = filter;
    }
}
