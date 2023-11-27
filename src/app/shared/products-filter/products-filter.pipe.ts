import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from '../products/product.interface';

@Pipe({
    name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
    transform(products: IProduct[], productName: string): IProduct[] {
        return products.filter(product => product.name.includes(productName));
    }
}
