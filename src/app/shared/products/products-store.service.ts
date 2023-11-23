import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IProduct} from './product.interface';
import {ProductsApiService} from './products-api.service';

@Injectable()
export class ProductsStoreService {
    private readonly productsStore$ = new BehaviorSubject<IProduct[] | null>(null);

    constructor(private readonly productsApiService: ProductsApiService) {}

    get products$(): Observable<IProduct[] | null> {
        return this.productsStore$.asObservable();
    }

    loadProducts() {
        this.productsApiService.getProducts$().subscribe(products => {
            this.productsStore$.next(products);
        });
        // setTimeout(() => {
        //     this.productsStore$.next(productsMock);
        // }, 2000);
    }
}
