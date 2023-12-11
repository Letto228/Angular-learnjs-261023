import {createReducer, on} from '@ngrx/store';
import {productsAdapter, productsInitialState} from './products.state';
import {addProducts} from './products.actions';

export const productsReducer = createReducer(
    productsInitialState,
    // on(addProducts, (productsState, action) => ({
    //     ...productsState,
    //     data: action.products,
    // })),
    // on(addProducts, (productsState, {products}) => ({...productsState, ids: [...], entities: {...}})),
    on(addProducts, (productsState, {products}) => productsAdapter.setAll(products, productsState)),
);
