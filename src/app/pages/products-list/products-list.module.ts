import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule, CardModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
