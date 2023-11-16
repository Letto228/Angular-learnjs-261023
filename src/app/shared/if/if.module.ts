import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IfDirective} from './if.directive';

@NgModule({
    declarations: [IfDirective],
    imports: [CommonModule],
    exports: [IfDirective],
})
export class IfModule {}
