import type {TemplateRef} from '@angular/core';

export interface IPopupTemplateData<T extends object> {
    template: TemplateRef<T> | null;
    context: T | null;
}
