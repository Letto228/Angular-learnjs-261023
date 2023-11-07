import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {CurrencyPipe} from '@angular/common';
import {CardComponent} from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [MatCardModule, MatButtonModule, MatListModule, CurrencyPipe],
    exports: [CardComponent],
})
export class CardModule {}
