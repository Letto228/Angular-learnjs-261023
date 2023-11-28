import {TemplateRef} from '@angular/core';

export interface IPopup {
    template: TemplateRef<unknown>;
    context: unknown;
}
