import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ProductCardComponent} from './product-card.component';

@NgModule({
    declarations: [ProductCardComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule],
    exports: [ProductCardComponent],
})
export class ProductCardModule {}
