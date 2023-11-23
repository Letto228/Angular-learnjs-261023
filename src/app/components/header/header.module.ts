import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HeaderComponent} from './header.component';
import {CurrencyModule} from '../../shared/currency/currency.module';

@NgModule({
    declarations: [HeaderComponent],
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, CurrencyModule],
    exports: [HeaderComponent],
})
export class HeaderModule {}
