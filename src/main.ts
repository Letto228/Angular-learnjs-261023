import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.isProd) {
    // code
    let arg = 'test';
    arg = arg.length ? 'test1' : 'test2'; // if used arg? then get no-unnecessary-condition error from eslint
    console.error(arg); // just refuse from @typescript-eslint/no-unused-vars error
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
