import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {delay, filter} from 'rxjs';
import {ProductsStoreService} from './products-store.service';
import {IProduct} from './product.interface';

export const productsResolver: ResolveFn<IProduct[]> = ({paramMap}, _state) => {
    const productsStoreService = inject(ProductsStoreService);
    const subCategoryId = paramMap.get('subCategoryId');

    productsStoreService.loadProducts(subCategoryId);

    return productsStoreService.products$.pipe(filter(Boolean), delay(5000));
};
