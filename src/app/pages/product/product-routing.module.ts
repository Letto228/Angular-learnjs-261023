import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProductComponent} from './product.component';
import {DescriptionComponent} from './description/description.component';
import {TypeComponent} from './type/type.component';
import {redirectGuard} from '../../shared/test-guards/redirect.guard';

const productRoutes: Routes = [
    {
        path: '',
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
                canActivate: [redirectGuard],
            },
            {
                path: 'type',
                component: TypeComponent,
            },
        ],
        // canMatch: [questionCanMatchGuard],
    },
    {
        path: '',
        component: ProductComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(productRoutes)],
    exports: [RouterModule],
})
export class ProductRoutingModule {}
