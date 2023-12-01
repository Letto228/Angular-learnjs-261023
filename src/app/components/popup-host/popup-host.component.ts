import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {PopUpContext} from 'src/app/shared/popup/popupcontext.interface';
import {BehaviorSubject} from 'rxjs';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent implements OnInit {
    template?: BehaviorSubject<PopUpContext<string> | null> | null;

    constructor(private readonly popupService: PopupService) {}

    ngOnInit() {
        this.listeningPopUp();
    }

    listeningPopUp() {
        this.template = this.popupService.tmplt;
    }

    closePopUp() {
        this.popupService.closePopup();
    }

    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return !this.template?.value;
    }
}
