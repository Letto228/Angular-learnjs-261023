import {ChangeDetectionStrategy, Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {map} from "rxjs";

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
        this.activatedRoute.paramMap.pipe(
            map(paramMap=>{
                return paramMap.get("id")
            }),
        ).subscribe(subCategoryId=>{
            if(subCategoryId){
                this.productsStoreService.loadProducts(subCategoryId)
                return
            }
            this.productsStoreService.loadProducts()
        })
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
