import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppScrollWithLoadingDirective} from './appscrollwithloading.directive';

@NgModule({
    declarations: [AppScrollWithLoadingDirective],
    imports: [CommonModule],
    exports: [AppScrollWithLoadingDirective],
})
export class AppscrollwithloadingModule {}
