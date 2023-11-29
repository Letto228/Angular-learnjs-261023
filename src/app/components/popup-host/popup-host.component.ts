import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnInit,
    TemplateRef,
} from '@angular/core';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent implements OnInit {
    template: TemplateRef<any> | null = null;

    constructor(
        private readonly popupService: PopupService,
        private readonly changeDetector: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.listeningPopUp();
    }

    listeningPopUp() {
        this.popupService.tmplt$.subscribe(data => {
            this.template = data || null;
            this.changeDetector.markForCheck();
        });
    }

    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return !this.template;
    }
}
