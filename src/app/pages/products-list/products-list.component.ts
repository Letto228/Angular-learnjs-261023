import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, takeUntil} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {DestroyService} from '../../shared/destroy/destroy.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class ProductsListComponent implements OnInit {
    readonly products$ = this.productsStoreService.products$;

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly destroy$: DestroyService,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap
            .pipe(map(params => params.get('id'), takeUntil(this.destroy$)))
            .subscribe(id => this.updateProductsList(id));
    }

    updateProductsList(subCategoryId: string | null | undefined) {
        this.productsStoreService.loadProducts(subCategoryId);
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
