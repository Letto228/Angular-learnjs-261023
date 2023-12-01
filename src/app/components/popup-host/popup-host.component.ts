import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PopupService} from './popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    private readonly popupService = inject(PopupService);
    readonly templateData$ = this.popupService.templateData$;

    close() {
        this.popupService.closePopup();
    }
}
