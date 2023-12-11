import {BehaviorSubject, Observable, Subscription, filter} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IProduct} from './product.interface';
import {ProductsApiService} from './products-api.service';
import {IState} from '../../store/reducer';

@Injectable({
    providedIn: 'root',
})
export class ProductsStoreService {
    private readonly productsStore$ = new BehaviorSubject<IProduct[] | null>(null);
    private readonly currentProductStore$ = new BehaviorSubject<IProduct | null>(null);

    private activeLoadProductsSubscription: Subscription | null = null;
    private activeLoadProductSubscription: Subscription | null = null;

    constructor(
        private readonly productsApiService: ProductsApiService,
        private readonly store$: Store<IState>,
    ) {}

    get products$(): Observable<IProduct[] | null> {
        return this.productsStore$.asObservable();
    }

    get currentProduct$(): Observable<IProduct | null> {
        return this.currentProductStore$.asObservable();
    }

    loadProducts(subcategoryId?: string | null) {
        if (this.activeLoadProductsSubscription) {
            this.activeLoadProductsSubscription.unsubscribe();
        }

        this.productsStore$.next(null);

        this.activeLoadProductsSubscription = this.productsApiService
            .getProducts$(subcategoryId)
            .subscribe(products => {
                this.productsStore$.next(products);

                // this.store$.dispatch(addProducts(products));

                this.activeLoadProductsSubscription = null;
            });
    }

    loadProduct(productId: string) {
        if (this.activeLoadProductSubscription) {
            this.activeLoadProductSubscription.unsubscribe();
        }

        const productPreview = this.productsStore$.value?.find(({_id}) => _id === productId);

        this.currentProductStore$.next(productPreview || null);

        this.activeLoadProductSubscription = this.productsApiService
            .getProduct$(productId)
            .pipe(filter(Boolean))
            .subscribe(product => {
                this.currentProductStore$.next(product);
            });
    }
}
