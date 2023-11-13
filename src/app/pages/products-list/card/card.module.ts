import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CardComponent} from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [MatCardModule, MatButtonModule],
    exports: [CardComponent],
})
export class CardModule {}
