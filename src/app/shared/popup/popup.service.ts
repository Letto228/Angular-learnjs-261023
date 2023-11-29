import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PopupTemplate} from './popup-template.interface';
import {PopupTemplateContext} from './popup-template-context.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly templateSubject$ = new BehaviorSubject<PopupTemplate | null>(null);

    template$ = this.templateSubject$.asObservable();

    openPopup(
        templateRef: TemplateRef<PopupTemplateContext>,
        templateContext: PopupTemplateContext,
    ) {
        const template: PopupTemplate = {
            templateRef,
            templateContext,
        };

        this.templateSubject$.next(template);
    }

    closePopup() {
        this.templateSubject$.next(null);
    }
}
