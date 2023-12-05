import {TemplateRef} from '@angular/core';

export interface PopUpContext<T extends object> {
    template: TemplateRef<T>;
    context: T;
}
