import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class SidenavComponent {
    @ViewChild(MatDrawer)
    private readonly drawerComponent?: MatDrawer;

    toggleSidenavOpened() {
        this.drawerComponent?.toggle();
    }
}
