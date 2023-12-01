import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import type {IPopupTemplateData} from './popup-template-data.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly templateDataStore$ = new BehaviorSubject<IPopupTemplateData<object> | null>(
        null,
    );

    readonly templateData$ = this.templateDataStore$.asObservable();

    openPopup<T extends object>(template: TemplateRef<T>, context: T | null = null) {
        this.templateDataStore$.next({template, context});
    }

    closePopup() {
        this.templateDataStore$.next(null);
    }
}
