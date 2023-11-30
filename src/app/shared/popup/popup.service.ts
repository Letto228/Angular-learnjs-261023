import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IPopup} from './popup.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly popup = new BehaviorSubject<IPopup | null>(null);
    readonly popup$ = this.popup.asObservable();

    openPopup(popup: IPopup) {
        this.popup.next(popup);
    }

    closePopup() {
        this.popup.next(null);
    }
}
