import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AppScrollWithLoadingModule} from 'src/app/shared/app-scroll-with-loading/app-scroll-with-loading.module';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {IfModule} from '../../shared/if/if.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [
        CardModule,
        IfModule,
        CommonModule,
        MatProgressSpinnerModule,
        AppScrollWithLoadingModule,
    ],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
