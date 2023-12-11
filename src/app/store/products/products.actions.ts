import {createAction} from '@ngrx/store';
import {IProduct} from '../../shared/products/product.interface';

export enum ProductsActionTypes {
    AddProducts = '[Products] Add products',
    LoadProducts = '[Products] Load products',
}

export const addProducts = createAction(
    ProductsActionTypes.AddProducts,
    (products: IProduct[]) => ({products}),
);

export const loadProducts = createAction(
    ProductsActionTypes.LoadProducts,
    (subCategoryId?: string | null) => ({subCategoryId}),
);

/**
 * addProducts([...]) => {type: ProductsActionTypes.AddProducts, products: [...]}
 */

// export class AddProducts {
//     readonly type = ProductsActionTypes.AddProducts;

//     readonly products: IProduct[];

//     constructor(products: IProduct[]) {
//         this.products = products;
//     }
// }
// export class AddProducts {
//     readonly type = ProductsActionTypes.AddProducts;

//     constructor(readonly products: IProduct[]) {}
// }

// new AddProducts([...]) => {type: ProductsActionTypes.AddProducts, products: [...]}
