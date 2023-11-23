import {NgModule} from '@angular/core';
import {MyAsyncPipe} from './my-async.pipe';

@NgModule({
    declarations: [MyAsyncPipe],
    exports: [MyAsyncPipe],
})
export class MyAsyncModule {}
