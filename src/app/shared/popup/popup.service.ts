import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ITemplateData} from './template-data.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    templateRefData$ = new BehaviorSubject<ITemplateData>({
        templateRef: null,
        context: null,
    });

    openPopup(templateRef: TemplateRef<{$implicit: string}>, context: {$implicit: string}) {
        this.templateRefData$.next({templateRef, context});
    }

    closePopup() {
        this.templateRefData$.next({
            templateRef: null,
            context: null,
        });
    }
}
