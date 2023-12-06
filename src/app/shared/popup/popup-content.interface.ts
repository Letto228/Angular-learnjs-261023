import {TemplateRef} from '@angular/core';

export interface IPopupContent {
    template: TemplateRef<unknown>;
    context: unknown;
}
