import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {PopupService} from '../../shared/popup/popup.service';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';

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
        const title = 'Some Context';

        this.popupService.openPopup({
            template,
            context: {$implicit: title},
        });
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
