import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {IfModule} from '../../shared/if/if.module';
import {PaginationModule} from '../../shared/pagination/pagination.module';
import {MyAsyncModule} from '../../shared/my-async/my-async.module';
import {ProductsFilterModule} from '../../shared/products-filter/products-filter.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [
        CardModule,
        IfModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        PaginationModule,
        MyAsyncModule,
        ProductsFilterModule,
    ],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
