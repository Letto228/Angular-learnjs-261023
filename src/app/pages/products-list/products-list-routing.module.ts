import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProductsListComponent} from './products-list.component';

const productsListRoutes: Routes = [
    {
        path: '',
        component: ProductsListComponent,
        // resolve: {
        //     products: productsResolver,
        // },
    },
    {
        path: ':subCategoryId',
        component: ProductsListComponent,
        // resolve: {
        //     products: productsResolver,
        // },
    },
];

@NgModule({
    imports: [RouterModule.forChild(productsListRoutes)],
    exports: [RouterModule],
})
export class ProductsListRoutingModule {}
