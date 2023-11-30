import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {BaseUrlInterceptor} from './shared/base-url/base-url.interceptor';
import {PopupHostModule} from './components/popup-host/popup-host.module';

@NgModule({
    declarations: [AppComponent],
    exports: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        SidenavModule,
        MatListModule,
        HttpClientModule,
        PopupHostModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: BaseUrlInterceptor,
        },
    ],
})
export class AppModule {}

/**
 *                              NullInjector
 *
 *                                   |
 *
 *                              PlatformInjector
 *
 *                                   |
 *
 *                       RootInjector(AppModuleInjector)
 *
 * ------------------------------------------------------------------------
 *
 *                            AppElementInjector
 *
 *                                   |
 *
 *                           SidenavElementInjector
 *
 *                                   |
 *
 *                        ProductsListElementInjector
 *
 */
