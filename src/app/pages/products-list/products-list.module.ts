import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {IfModule} from '../../shared/if/if.module';
import {ScrollLoadingDirective} from '../../shared/scroll-loading/scroll-loading.directive';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [CardModule, IfModule, CommonModule, MatProgressSpinnerModule, ScrollLoadingDirective],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
