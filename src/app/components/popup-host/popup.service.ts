import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import type {IPopupTemplateData} from './popup-template-data.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    templateData$ = new BehaviorSubject<IPopupTemplateData>({
        template: null,
        context: null,
    });

    openPopup<T>(template: TemplateRef<T>, context: T | null = null) {
        this.templateData$.next({template, context});
    }

    closePopup() {
        this.templateData$.next({template: null, context: null});
    }
}
