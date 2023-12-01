import {TemplateRef} from '@angular/core';

export interface PopUpContext<T> {
    template: TemplateRef<T>;
    $implicit: T;
}
