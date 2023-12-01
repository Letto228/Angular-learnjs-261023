import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from './pages/products-list/products-list.component';
import {ProductComponent} from './pages/product/product.component';
import {ProductsListModule} from './pages/products-list/products-list.module';
import {ProductModule} from './pages/product/product.module';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NotFoundModule} from './pages/not-found/not-found.module';
import {TypeComponent} from './pages/product/type/type.component';
import {DescriptionComponent} from './pages/product/description/description.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products-list',
    },
    {
        path: 'products-list', // ['products-list']
        children: [
            {
                path: '',
                component: ProductsListComponent,
            },
            {
                path: ':subCategoryId',
                component: ProductsListComponent,
            },
        ],
    },
    {
        path: 'product/:id', // ['product', 'id']
        component: ProductComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'description',
            },
            {
                path: 'description',
                component: DescriptionComponent,
            },
            {
                path: 'type',
                component: TypeComponent,
            },
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), ProductsListModule, ProductModule, NotFoundModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}

// url === http://localhost:4200/product/id/type
// urlSegments === product/id/type

// search indexes: 0 -> 1 -> 2 -> ...
// current url segments: ['product', ':id']

/**
 *                  ____________    undefined   _______________
 *       __________/              /           \                \_________
 *      /                        /             \                         \
 *     |                        |               |                         |
 *    ['']         ['products-list']         ['product', ':id']         ['**']
 *                                              /           \
 *                                             /             \
 *                                            |               |
 *                                  ['description']        ['type']
 */
