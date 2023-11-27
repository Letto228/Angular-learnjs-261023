import {map, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from './product.interface';
import {IProductsDto} from './products.dto';

@Injectable({
    providedIn: 'root',
})
export class ProductsApiService {
    constructor(private readonly httpClient: HttpClient) {}

    getProducts$(): Observable<IProduct[]> {
        return (
            this.httpClient
                .get<IProductsDto>(`/products/suggestion`)
                // .get<IProductsDto>(`${baseUrl}/products/suggestion`, {
                //     headers: new HttpHeaders(),
                //     params: {text: '123'},
                // })
                .pipe(map(({data}) => data.items))
        );
        // return of<IProductsDto>({data: {items: productsMock}}).pipe(map(({data}) => data.items));
    }
}
