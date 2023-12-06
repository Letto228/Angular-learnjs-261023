import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PopupService} from 'src/app/shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    constructor(private readonly popupService: PopupService) {}

    get popupContent$() {
        return this.popupService.popupContent$;
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
