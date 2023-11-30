import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnDestroy,
    TemplateRef,
} from '@angular/core';
import {Subscription} from 'rxjs';
import {IPopup} from 'src/app/shared/popup/popup.interface';
import {PopupService} from 'src/app/shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent implements OnDestroy {
    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return !this.template;
    }

    template: TemplateRef<unknown> | null = null;
    context: unknown | null = null;

    readonly popupServiceSubscription: Subscription;

    constructor(
        private readonly popupService: PopupService,
        private readonly changeDetectionRef: ChangeDetectorRef,
    ) {
        this.popupServiceSubscription = popupService.popupTemplate.subscribe(data =>
            this.updateTemplate(data),
        );
    }

    closePopup() {
        this.popupService.closePopup();
    }

    private updateTemplate(data: IPopup | null) {
        this.template = data?.template || null;
        this.context = data?.context;
        this.changeDetectionRef.markForCheck();
    }

    ngOnDestroy() {
        if (this.popupServiceSubscription) {
            this.popupServiceSubscription.unsubscribe();
        }
    }
}
