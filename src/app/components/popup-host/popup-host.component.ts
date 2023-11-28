import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
} from '@angular/core';
import type {Subscription} from 'rxjs';
import {PopupService} from './popup.service';
import type {IPopupTemplateData} from './popup-template-data.interface';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent implements OnInit, OnDestroy {
    template: IPopupTemplateData['template'] = null;
    templateContext: IPopupTemplateData['context'] = null;

    private templateDataSubscribe: Subscription | null = null;

    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return !this.template;
    }

    constructor(
        private readonly popupService: PopupService,
        private readonly changeDetector: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.listenTemplateData();
    }

    ngOnDestroy() {
        this.templateDataSubscribe?.unsubscribe();
    }

    private listenTemplateData() {
        this.templateDataSubscribe = this.popupService.templateData$.subscribe(templateData => {
            this.templateContext = templateData.context;
            this.template = templateData.template;

            this.changeDetector.markForCheck();
        });
    }
}
