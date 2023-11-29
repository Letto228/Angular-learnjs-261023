import {TemplateRef} from '@angular/core';
import {PopupTemplateContext} from './popup-template-context.interface';

export interface PopupTemplate {
    templateRef: TemplateRef<PopupTemplateContext>;
    templateContext: PopupTemplateContext;
}
