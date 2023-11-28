import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IPopup} from './popup.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    readonly popupTemplate = new BehaviorSubject<IPopup | null>(null);

    openPopup(popup: IPopup) {
        this.popupTemplate.next(popup);
    }

    closePopup() {
        this.popupTemplate.next(null);
    }
}
