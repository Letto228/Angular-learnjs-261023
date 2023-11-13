import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.isProd) {
    // code
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    /* eslint no-console: 0 */
    .catch((err) => console.error(err));
