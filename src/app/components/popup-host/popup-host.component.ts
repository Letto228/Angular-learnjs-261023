import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PopupService} from 'src/app/shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    get popup$() {
        return this.popupService.popup$;
    }

    constructor(private readonly popupService: PopupService) {}

    closePopup() {
        this.popupService.closePopup();
    }
}
