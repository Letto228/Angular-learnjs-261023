import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {IfModule} from '../../shared/if/if.module';
import {MatIconModule} from "@angular/material/icon";
import {PaginationModule} from "../../shared/pagination/pagination.module";

@NgModule({
    declarations: [ProductsListComponent],
    imports: [CardModule, IfModule, MatIconModule, CommonModule, MatProgressSpinnerModule, PaginationModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
