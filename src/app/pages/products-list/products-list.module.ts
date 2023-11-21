import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AppscrollwithloadingModule} from '../../shared/appscrollwithloading/appscrollwithloading.module';
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
        AppscrollwithloadingModule,
    ],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
