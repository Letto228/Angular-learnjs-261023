import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupService} from '../popup-host/popup.service';

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

    openPopup(template: TemplateRef<{$implicit: string}>) {
        this.popupService.openPopup(template, {$implicit: 'Popup title from context'});
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
