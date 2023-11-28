import type {TemplateRef} from '@angular/core';

export interface IPopupTemplateData {
    template: TemplateRef<unknown> | null;
    context: unknown | null;
}
