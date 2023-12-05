import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, tap} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    readonly products$ = this.productsStoreService.products$;

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {
        this.productsStoreService.loadProducts();

        this.activatedRoute.paramMap
            .pipe(
                map(param => param.get('id')),
                tap(catId => {
                    this.productsStoreService.loadProducts(catId);
                }),
            )
            .subscribe();
    }

    trackById(_index: number, {_id}: IProduct) {
        return _id;
    }

    navigateToProduct() {
        // this.router.navigate(['product', 'id']);
        this.router.navigate(['/product/id']);
        // this.router.navigateByUrl('/product/id');
    }
}
