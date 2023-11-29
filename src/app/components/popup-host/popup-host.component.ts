import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    template$ = this.popupService.template$;

    constructor(private readonly popupService: PopupService) {}

    close() {
        this.popupService.closePopup();
    }
}
