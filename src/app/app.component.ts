import {Component, ViewChild} from '@angular/core';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {SidenavComponent} from './components/sidenav/sidenav.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    // encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    readonly applicationConfig = applicationConfigMock;

    // needShowSidenav = false;

    // @ViewChild(SidenavComponent)
    // private readonly sidenavComponent?: SidenavComponent;
    @ViewChild('sidenav')
    private readonly sidenavComponent?: SidenavComponent;

    onMenuClick(event: string) {
        // eslint-disable-next-line no-console
        console.log('Menu clicked', event);
        // this.needShowSidenav = !this.needShowSidenav;

        this.sidenavComponent?.toggleSidenavOpened();
    }
}
