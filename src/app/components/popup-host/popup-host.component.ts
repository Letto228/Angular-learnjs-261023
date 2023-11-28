import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnInit,
    TemplateRef,
} from '@angular/core';
import {takeUntil} from 'rxjs';
import {PopupService} from '../../shared/popup/popup.service';
import {DestroyService} from '../../shared/destroy/destroy.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class PopupHostComponent implements OnInit {
    template: TemplateRef<{$implicit: string}> | null = null;
    templateContext: {$implicit: string} | null = null;

    constructor(
        private readonly popupService: PopupService,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly destroy$: DestroyService,
    ) {}

    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return !this.template;
    }

    ngOnInit(): void {
        this.listenTemplateRefData();
    }

    private listenTemplateRefData() {
        this.popupService.templateRefData$
            .pipe(takeUntil(this.destroy$))
            .subscribe(templateData => {
                this.template = templateData.templateRef;
                this.templateContext = templateData.context;
                this.changeDetectorRef.markForCheck();
            });
    }
}
