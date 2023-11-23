import {NgModule, inject} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {ProductsListModule} from './pages/products-list/products-list.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {ProductsStoreService} from './shared/products/products-store.service';
import {ProductsApiService} from './shared/products/products-api.service';

@NgModule({
    declarations: [AppComponent],
    exports: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        ProductsListModule,
        SidenavModule,
        MatListModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        // {
        //     provide: ProductsStoreService, // token
        //     useClass: ProductsStoreService,
        // },
        ProductsStoreService,
        ProductsApiService,
        // {
        //     provide: ProductsStoreService,
        //     useFactory: () => new ProductsStoreService(),
        // },
        // {
        //     provide: 'name',
        //     useValue: 'Egor',
        // },
        {
            provide: 'name',
            useFactory: () => ['Anna', 'Jeka'],
            multi: false,
        },
        {
            provide: 'name',
            useFactory: () => ['Egor', 'Alex'],
            multi: false,
        },
        // {
        //     provide: 'ProductsStoreService',
        //     useExisting: ProductsStoreService,
        // },
        // {
        //     provide: 'ProductsStoreService',
        //     useFactory: (productsStoreService: ProductsStoreService) => productsStoreService,
        //     deps: [ProductsStoreService],
        // },
        {
            provide: 'ProductsStoreService',
            useFactory: () => inject(ProductsStoreService),
        },
    ],
})
export class AppModule {}
