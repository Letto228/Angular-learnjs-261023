import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {CardComponent} from './card/card.component';
import {ProductsListComponent} from './products-list.component';

@NgModule({
    declarations: [ProductsListComponent, CardComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
