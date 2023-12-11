import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {IProduct} from '../../shared/products/product.interface';

export const PRODUCTS_FEATURE = 'products';

// export interface IProductsState {
//     entities: Record<IProduct['_id'], IProduct>;
//     ids: Array<IProduct['_id']>;
//     // data: IProduct[] | null;
// }
export interface IProductsState extends EntityState<IProduct> {
    filter: unknown | null;
}

export const productsAdapter = createEntityAdapter<IProduct>({
    // selectId: ({name, price}) => name + price,
    selectId: ({_id}) => _id,
    // sortComparer: () => {}
});

// export const productsInitialState: IProductsState = {
//     entities: {},
//     ids: [],
//     // data: null,
// };
export const productsInitialState: IProductsState = productsAdapter.getInitialState({
    filter: null,
});
