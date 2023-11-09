import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    @Input() applicationConfig: ApplicationConfig | null = null;

    @Output() readonly menuClick = new EventEmitter<string>();

    onMenuClick(_event: MouseEvent) {
        // eslint-disable-next-line no-console
        // console.log('Menu click', event.clientX, event.clientY);
        // event.stopPropagation();

        this.menuClick.emit('event');
    }

    onContextmenu(_event: Event) {
        // event.preventDefault();
        // return false;
    }
}
