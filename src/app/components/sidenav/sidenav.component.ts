import {Component, ContentChild, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatList} from '@angular/material/list';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class SidenavComponent implements OnInit {
    // @Input() navigationTemplate: TemplateRef<unknown> | null = null;
    // @Input() title: string | null = null;

    @ViewChild(MatDrawer)
    private readonly drawerComponent?: MatDrawer;

    // @ViewChild(MatDrawer, {read: ElementRef, static: true})
    // private readonly drawerElement?: ElementRef<HTMLElement>;

    // @ViewChild('viewPort', {static: true, read: ViewContainerRef})
    // private readonly viewPort?: ViewContainerRef;

    // @ContentChild('navigationTemplate', {static: true})
    // private readonly navigationTemplate?: TemplateRef<unknown>;

    @ContentChild(MatList, {static: true, descendants: false})
    private readonly matListComponent?: MatList;

    toggleSidenavOpened() {
        this.drawerComponent?.toggle();

        // console.log(this.drawerElement);
    }

    // ngOnChanges({title}: SimpleChanges): void {
    // const isTitleChanged = Boolean(title);

    // if (isTitleChanged) {
    // if (title) {
    //     console.log(title.previousValue, title.currentValue);
    //     console.log(this.title, this.title === title.currentValue);
    // }
    // }

    // ngOnChanges({navigationTemplate}: SimpleChanges) {
    //     if (navigationTemplate && this.navigationTemplate) {
    //         this.viewPort?.clear();
    //         this.viewPort?.createEmbeddedView(this.navigationTemplate);
    //     }
    // }

    ngOnInit(): void {
        // console.log('ngOnInit', this.drawerElement);
        // console.log(this.navigationTemplate);

        // if (this.navigationTemplate) {
        //     this.viewPort?.createEmbeddedView(this.navigationTemplate);
        // }

        // eslint-disable-next-line no-console
        console.log(this.matListComponent);
    }

    // ngDoCheck(): void {
    // console.log('ngDoCheck');
    // }

    // ngAfterContentInit(): void {
    // console.log('ngAfterContentInit');
    // }

    // ngAfterContentChecked(): void {
    // console.log('ngAfterContentChecked');
    // }

    // ngAfterViewInit(): void {
    // console.log('ngAfterViewInit');
    // console.log('ngAfterViewInit', this.drawerElement);
    // }

    // ngAfterViewChecked(): void {
    // console.log('ngAfterViewChecked');
    // }

    // ngOnDestroy(): void {
    // console.log('ngOnDestroy');
    // }
}
