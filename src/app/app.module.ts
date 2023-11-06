import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {ProductsListModule} from './pages/products-list/products-list.module';

// View
// -----------------------
// Components / Directives
// Pipe

// Logic
// --------
// Services

@NgModule({
    declarations: [AppComponent], // const
    exports: [], // module.exports = {}
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        ProductsListModule,
    ], // import {...} from '...'
    // providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

// HeaderComponent
// Declaration: HeaderModule,
// HeaderModule(exports): [HeaderComponent]

// AppModule(imports): [HeaderModule],
