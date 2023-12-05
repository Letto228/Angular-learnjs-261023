import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PopUpContext} from './popupcontext.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly tmplt$ = new BehaviorSubject<PopUpContext<object> | null>(null);

    openPopup<T extends object>(popupContent: PopUpContext<T>) {
        this.tmplt$.next(popupContent);
    }

    closePopup() {
        this.tmplt$.next(null);
    }

    get tmplt(): Observable<PopUpContext<object> | null> {
        return this.tmplt$.asObservable();
    }
}
