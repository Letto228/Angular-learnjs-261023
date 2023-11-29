import {BehaviorSubject} from 'rxjs';
import {Injectable, TemplateRef} from '@angular/core';
import {PopUpContext} from './popupcontext.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    tmplt$ = new BehaviorSubject<TemplateRef<PopUpContext<string>> | null>(null);

    openPopup(templateRef: TemplateRef<PopUpContext<string>>) {
        this.tmplt$.next(templateRef);
    }

    closePopup() {
        this.tmplt$.next(null);
    }
}
