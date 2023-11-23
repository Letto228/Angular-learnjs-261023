import {map, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {IProduct} from './product.interface';
import {productsMock} from './products.mock';

@Injectable()
export class ProductsApiService {
    getProducts$(): Observable<IProduct[]> {
        return of({data: {items: productsMock}}).pipe(map(({data}) => data.items));
    }
}
