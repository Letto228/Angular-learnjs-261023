import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
// import {Store} from '@ngrx/store';
import {addProducts, loadProducts} from './products.actions';
import {ProductsApiService} from '../../shared/products/products-api.service';
// import {IState} from '../reducer';

@Injectable()
export class ProductsEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly productsApiService: ProductsApiService, // private readonly store$: Store<IState>,
    ) {}

    readonly loadProducts$ = createEffect(
        () =>
            this.actions$.pipe(
                // filter(({type}) => type === loadProducts.type),
                ofType(loadProducts),
                switchMap(({subCategoryId}) =>
                    this.productsApiService.getProducts$(subCategoryId).pipe(
                        map(products => addProducts(products)),
                        catchError(() => of(addProducts([]))),
                        // tap(action => {
                        //     this.store$.dispatch(action);
                        // }),
                    ),
                ),
            ),
        // {dispatch: true}, // .subscribe(action => {this.store$.dispatch(action)});
        // {dispatch: false}, // .subscribe();
    );
}
