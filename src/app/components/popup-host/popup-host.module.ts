import {NgModule} from '@angular/core';
import {NgIf} from '@angular/common';
import {PopupHostComponent} from './popup-host.component';

@NgModule({
    declarations: [PopupHostComponent],
    imports: [NgIf],
    exports: [PopupHostComponent],
})
export class PopupHostModule {}
