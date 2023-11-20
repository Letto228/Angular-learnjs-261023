import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollWithLoadingDirective} from './scroll-with-loading.directive';

@NgModule({
    declarations: [ScrollWithLoadingDirective],
    exports: [ScrollWithLoadingDirective],
    imports: [CommonModule],
})
export class ScrollWithLoadingModule {}
