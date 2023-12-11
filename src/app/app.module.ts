import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {BaseUrlInterceptor} from './shared/base-url/base-url.interceptor';
import {PopupHostModule} from './components/popup-host/popup-host.module';
import {reducer} from './store/reducer';
import {effects} from './store/effects';

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
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument(),
        // ...(environment.isProd ? [] : [StoreDevtoolsModule.instrument()]),
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
