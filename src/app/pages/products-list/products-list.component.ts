import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    // private readonly productsStoreService = new ProductsStoreService();
    // private readonly elementRef = inject(ElementRef);

    readonly products$ = this.productsStoreService.products$;

    // for easy
    name = 'Мышь';

    // for hard
    readonly propertyName = 'feedbacksCount' as const; // keyof IProduct
    searchPropertyValue = 2;

    // constructor(
    //     @Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef,
    //     @Inject(ElementRef) private readonly elementRef: ElementRef,
    // ) {
    //     console.log(elementRef);
    // }
    // constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    // constructor(
    //     @Inject(ProductsStoreService) private readonly productsStoreService: ProductsStoreService,
    // ) {}
    constructor(
        private readonly productsStoreService: ProductsStoreService,
        @Inject('ProductsStoreService')
        private readonly productsStoreServiceStr: ProductsStoreService, // @Inject('name') private readonly name: string,
    ) {
        // eslint-disable-next-line no-console
        console.log(this.productsStoreServiceStr, this.productsStoreService);
        // eslint-disable-next-line no-console
        console.log(this.productsStoreServiceStr === this.productsStoreService);
        // eslint-disable-next-line no-console
        // console.log(this.name);
    }

    ngOnInit(): void {
        // console.log(this.elementRef);
        this.productsStoreService.loadProducts();

        // this.changeDetectorRef.detach();
        // this.changeDetectorRef.detectChanges();

        // setTimeout(() => {
        //     this.products = productsMock;
        //     this.changeDetectorRef.markForCheck();
        //     // this.changeDetectorRef.detectChanges();
        // }, 4000);

        // setTimeout(() => {
        //     this.changeDetectorRef.reattach();
        // }, 6000);
    }

    // ngDoCheck() {
    //     console.log('ngDoCheck');
    //     this.changeDetectorRef.detectChanges();
    // }

    trackById(_index: number, {_id}: IProduct) {
        return _id;
    }
}
