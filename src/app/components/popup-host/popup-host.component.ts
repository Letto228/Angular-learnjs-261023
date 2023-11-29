import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnInit,
} from '@angular/core';
import {takeUntil} from 'rxjs';
import {PopupService} from './popup.service';
import type {IPopupTemplateData} from './popup-template-data.interface';
import {DestroyService} from '../../shared/destroy/destroy.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class PopupHostComponent implements OnInit {
    template: IPopupTemplateData['template'] = null;
    templateContext: IPopupTemplateData['context'] = null;

    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return !this.template;
    }

    constructor(
        readonly popupService: PopupService,
        private readonly destroy$: DestroyService,
        private readonly changeDetector: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.listenTemplateData();
    }

    private listenTemplateData() {
        this.popupService.templateData$.pipe(takeUntil(this.destroy$)).subscribe(templateData => {
            this.templateContext = templateData.context;
            this.template = templateData.template;

            this.changeDetector.markForCheck();
        });
    }
}
