import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IPopupContent} from './popup-content.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly popupStore$ = new BehaviorSubject<IPopupContent | null>(null);
    readonly popupContent$ = this.popupStore$.asObservable();

    openPopup(popupContent: IPopupContent) {
        this.popupStore$.next(popupContent);
    }

    closePopup() {
        this.popupStore$.next(null);
    }
}
