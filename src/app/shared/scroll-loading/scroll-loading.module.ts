import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollLoadingDirective} from './scroll-loading.directive';

@NgModule({
    declarations: [ScrollLoadingDirective],
    exports: [ScrollLoadingDirective],
    imports: [CommonModule],
})
export class ScrollLoadingModule {}
