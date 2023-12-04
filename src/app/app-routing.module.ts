import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NotFoundModule} from './pages/not-found/not-found.module';
import {CustomPreloadingStratagyService} from './shared/custom-preloading-strategy/custom-preloading-stratagy.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products-list',
    },
    {
        path: 'products-list',
        // children: productsListRoutes,
        loadChildren: () =>
            import('./pages/products-list/products-list.module').then(m => m.ProductsListModule),
        data: {
            needPreload: true,
        },
    },
    {
        path: 'product/:id',
        // children: productRoutes,
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
        data: {
            needPreload: false,
        },
        // canActivate: [(...args) => inject(GuardService).canActivate(args)],
        // canActivate: [questionCanActivateGuard],
        // canActivateChild: [questionCanActivateChildGuard],
        // canDeactivate: [questionCanDeactivateGuard],
        // canLoad: [() => question('Вы хотите загрузить данный модуль?')],
        // canMatch: [questionCanMatchGuard],
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadingStratagyService}),
        NotFoundModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

/**
 *                  ____________    undefined   _______________
 *       __________/              /           \                \_________
 *      /                        /             \                         \
 *     |                        |               |                         |
 *    ['']         ['products-list']         ['product', ':id']         ['**']
 *                /               \                   |
 *               |                 |                 ['']
 *                                              /           \
 *              ['']       [':subCategoryId']  /             \
 *                                            |               |
 *                                  ['description']        ['type']
 */
