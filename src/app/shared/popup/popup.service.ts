import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ITemplateData} from './template-data.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly templateRefData$ = new BehaviorSubject<ITemplateData>({
        templateRef: null,
        context: null,
    });

    readonly templateRef$ = this.templateRefData$.asObservable();

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
