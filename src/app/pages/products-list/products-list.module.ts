import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {PaginationModule} from 'src/app/shared/pagination/pagination.module';
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
        PaginationModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
