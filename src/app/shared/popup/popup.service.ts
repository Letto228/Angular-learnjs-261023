import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {PopUpContext} from './popupcontext.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly tmplt$ = new BehaviorSubject<PopUpContext<string> | null>(null);

    openPopup(popUpContext: PopUpContext<string>) {
        this.tmplt$.next(popUpContext);
    }

    closePopup() {
        this.tmplt$.next(null);
    }

    get tmplt(): BehaviorSubject<PopUpContext<string> | null> {
        return this.tmplt$;
    }
}
