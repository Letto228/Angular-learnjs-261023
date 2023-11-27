import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
    Optional,
    SkipSelf,
} from '@angular/core';
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
        @Inject('123') @Optional() @SkipSelf() private readonly parentElementRef: any | null,
    ) {
        // eslint-disable-next-line no-console
        console.log(this.parentElementRef);
    }

    ngOnInit(): void {
        this.productsStoreService.loadProducts();
    }

    trackById(_index: number, {_id}: IProduct) {
        return _id;
    }
}
