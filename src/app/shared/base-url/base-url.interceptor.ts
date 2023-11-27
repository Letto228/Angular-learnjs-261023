import {Inject, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from './base-url.token';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    constructor(@Inject(BASE_URL) private readonly baseUrl: string) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // console.log(request);

        const newRequest = request.clone({
            url: this.baseUrl + request.url,
        });

        // console.log(newRequest);

        return next.handle(newRequest);
        // Move to CatchErrorInterceptor
        // return next.handle(newRequest).pipe(
        //     tap({
        //         error: _error => {},
        //     }),
        // );
    }
}
