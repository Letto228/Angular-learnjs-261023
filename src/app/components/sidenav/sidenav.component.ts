import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class SidenavComponent {
    // @Input() isSidenavOpened = false;

    // @Output() readonly isSidenavOpenedChange = new EventEmitter<boolean>();

    // @ViewChild('drawer')
    // private readonly drawerComponent?: MatDrawer;
    @ViewChild(MatDrawer)
    private readonly drawerComponent?: MatDrawer;

    // @ViewChild(TemplateRef)
    // private readonly templateRef?: TemplateRef<unknown>;
    // @ViewChild('testMany')
    // private readonly elementRef?: HTMLParagraphElement;

    toggleSidenavOpened() {
        // this.isSidenavOpened = !this.isSidenavOpened;
        // this.isSidenavOpenedChange.emit(!this.isSidenavOpened);
        this.drawerComponent?.toggle();
        // console.log(this.elementRef);
    }
}
