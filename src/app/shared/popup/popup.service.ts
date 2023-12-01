import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {PopUpContext} from './popupcontext.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    tmplt$ = new BehaviorSubject<PopUpContext<string> | null>(null);

    openPopup(popUpContext: PopUpContext<string>) {
        this.tmplt$.next(popUpContext);
    }

    closePopup() {
        this.tmplt$.next(null);
    }
}
