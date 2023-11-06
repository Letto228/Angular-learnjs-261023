import {Component} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    imgSrc = '../../../favicon.ico';

    onMenuClick(event: MouseEvent) {
        // eslint-disable-next-line no-console
        console.log('Menu click', event.clientX, event.clientY);
        event.stopPropagation();
    }

    onContextmenu(_event: Event) {
        // event.preventDefault();
        // return false;
    }
}
