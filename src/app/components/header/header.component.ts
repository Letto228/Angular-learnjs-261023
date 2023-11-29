import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupService} from '../../shared/popup/popup.service';
import {PopupTemplateContext} from '../../shared/popup/popup-template-context.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input() applicationConfig: ApplicationConfig | null = null;

    @Output() readonly menuClick = new EventEmitter<void>();

    constructor(private readonly popupService: PopupService) {}

    onMenuClick(_event: MouseEvent) {
        this.menuClick.emit();
    }

    openPopup(templateRef: TemplateRef<PopupTemplateContext>) {
        this.popupService.openPopup(templateRef, {$implicit: this.applicationConfig?.title || ''});
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
