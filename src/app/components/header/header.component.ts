import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    @Input() applicationConfig: ApplicationConfig | null = null;

    @Output() menuClick = new EventEmitter<MouseEvent>();

    onMenuClick(event: MouseEvent) {
        this.menuClick.emit(event);
    }

    onContextmenu(_event: Event) {
        // event.preventDefault();
        // return false;
    }
}
