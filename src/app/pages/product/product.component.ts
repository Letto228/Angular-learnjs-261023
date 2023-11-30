import {ChangeDetectionStrategy, Component} from '@angular/core';
import {filter, map, switchMap, tap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    // readonly product$ = of('portativnaa-kolonka-huawei-cm510-cernyj').pipe(
    readonly product$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('id')),
        filter(Boolean),
        tap(productId => {
            // console.log('tap', productId);
            this.productsStoreService.loadProduct(productId);
        }),
        switchMap(() => this.productsStoreService.currentProduct$),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {
        // console.log('constructor', this.activatedRoute.snapshot.paramMap.get('id'));
        // this.activatedRoute.queryParams.subscribe(console.log);
    }

    navigateToType() {
        // console.log(this.activatedRoute);

        // setTimeout(() => {
        //     this.router.navigate(['/product', 'portativnaa-kolonka-huawei-cm510-cernyj']);
        // }, 5000);
        // this.router.navigate(['./type']);
        // this.router.navigateByUrl('./type');

        // const urlTree = this.router.createUrlTree(['./type'], {
        //     relativeTo: this.activatedRoute,
        // });

        // this.router.navigateByUrl(urlTree);

        // console.log(urlTree.toString());

        this.router.navigate(['./type'], {
            relativeTo: this.activatedRoute,
            queryParams: {text: 'Egor'},
        });
    }
}
