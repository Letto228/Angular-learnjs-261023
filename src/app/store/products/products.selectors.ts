import {createFeatureSelector} from '@ngrx/store';
import {IProductsState, PRODUCTS_FEATURE, productsAdapter} from './products.state';

export const productsFeatureSelector = createFeatureSelector<IProductsState>(PRODUCTS_FEATURE);
// productsFeatureSelector = (state: IState) => state[PRODUCTS_FEATURE];

// export const selectProductsEntities = createSelector(
//     productsFeatureSelector,
//     (productsState: IProductsState) => productsState.entities, // extractFn
// );
// selectProductsEntities = (state: IState) => extractFn(productsFeatureSelector(state))

// export const selectProductsIds = createSelector(
//     productsFeatureSelector,
//     (productsState: IProductsState) => productsState.ids, // extractFn
// );
// selectProductsIds = (state: IState) => extractFn(productsFeatureSelector(state))

// export const selectProducts = createSelector(
//     selectProductsEntities,
//     selectProductsIds,
//     (entities, ids) => ids.map(id => entities[id]), // extractFn
// );
// selectProductsIds = (state: IState) => extractFn(selectProductsEntities(state), selectProductsIds(state))
// export const selectProducts = createSelector(
//     productsFeatureSelector,
//     ({entities, ids}) => ids.map(id => entities[id]), // extractFn
// );
// selectProductsIds = (state: IState) => extractFn(productsFeatureSelector(state))

// export const {selectEntities, selectIds, selectAll} = productsAdapter.getSelectors();

// export const selectProductsEntities = createSelector(productsFeatureSelector, selectEntities);
// export const selectProductsIds = createSelector(productsFeatureSelector, selectIds);
// export const selectProducts = createSelector(productsFeatureSelector, selectAll);

export const {
    selectEntities: selectProductsEntities,
    // createSelector(productsFeatureSelector, selectEntities);
    selectIds: selectProductsIds,
    // createSelector(productsFeatureSelector, selectIds);
    selectAll: selectProducts,
    // createSelector(productsFeatureSelector, selectAll);
} = productsAdapter.getSelectors(productsFeatureSelector);
