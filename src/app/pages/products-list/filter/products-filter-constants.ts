import {IProductsFilterForm} from './products-filter-form.interface';

export class ProductsFilterConstants {
    static min: IProductsFilterForm['priceRange']['min'] = 0;
    static max: IProductsFilterForm['priceRange']['max'] = 9999;
}
