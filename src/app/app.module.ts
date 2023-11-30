import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {ProductsListModule} from './pages/products-list/products-list.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {BaseUrlInterceptor} from './shared/base-url/base-url.interceptor';
import {PopupHostModule} from './components/popup-host/popup-host.module';

// export const baseUrlToken = {name: 'baseUrl'};

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
        HttpClientModule,
        PopupHostModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        // ...ProductsListModule.providers,
        // ...SidenavModule.providers,
        // ...AnyImportsModule.providers,

        // ProductsStoreService,
        // ProductsApiService,
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: BaseUrlInterceptor,
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     multi: true,
        //     useClass: AuthInterceptor,
        // },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     multi: true,
        //     useClass: CatchErrorInterceptor,
        // },

        // [BaseUrlInterceptor, AuthInterceptor, CatchErrorInterceptor]

        // BaseUrlInterceptor: next.handle(r) -> AuthInterceptor.intercept(r, h)
        // AuthInterceptor: next.handle(r) -> CatchErrorInterceptor.intercept(r, h)
        // CatchErrorInterceptor: next.handle(r) -> BackandInterceptor.intercept(r, h)

        // BackandInterceptor.intercept(r, h)

        // CatchErrorInterceptor: BackandInterceptor.intercept(r, h).pipe();
        // AuthInterceptor: CatchErrorInterceptor.intercept(r, h).pipe();
        // BaseUrlInterceptor: AuthInterceptor.intercept(r, h).pipe();

        /**
         * BackandInterceptor.intercept(r, h)
         *  .pipe(CatchErrorInterceptor)
         *  .pipe(AuthInterceptor)
         *  .pipe(BaseUrlInterceptor);
         *  */

        // {
        //     provide: BASE_URL,
        //     useValue: baseUrl,
        // },
    ],
})
export class AppModule {
    // constructor() {
    //     const parentInjector = Injector.create({
    //         providers: [
    //             {
    //                 provide: 'name',
    //                 useValue: 'Egor',
    //             },
    //         ],
    //     });
    //     const injector = Injector.create({
    //         providers: [
    //             {
    //                 provide: BASE_URL,
    //                 useValue: 'http://base',
    //             },
    //         ],
    //         parent: parentInjector,
    //     });
    //     console.log(injector.get(BASE_URL), 'BASE_URL');
    //     console.log(injector.get('name'), 'name');
    // }
}

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
