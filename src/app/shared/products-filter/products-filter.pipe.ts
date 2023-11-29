import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from '../products/product.interface';

@Pipe({
    name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
    transform(products: IProduct[] | null, name: string): IProduct[] | null {
        if (!products?.length) {
            return products;
        }

        const charactersInSearch = name.toLowerCase();

        return products.filter(product => {
            const productName = product.name.toLowerCase();

            return productName.includes(charactersInSearch);
        });
    }
}
