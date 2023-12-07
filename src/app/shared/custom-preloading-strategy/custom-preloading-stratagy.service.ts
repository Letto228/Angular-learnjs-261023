import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CustomPreloadingStratagyService implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
        // eslint-disable-next-line dot-notation
        if (route.data?.['needPreload']) {
            // eslint-disable-next-line no-console
            console.log('Preloading', route.path);

            return load();
        }

        // eslint-disable-next-line no-console
        console.log('NO Preloading', route.path);

        return EMPTY;
    }
}
