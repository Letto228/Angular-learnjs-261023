import {Input, Component, ViewChild, OnChanges, TemplateRef, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnChanges {
    isOpenPopup = false;

    @Input()
    template: TemplateRef<unknown> | null = null;

    @ViewChild('viewContainer', {static: true, read: ViewContainerRef})
    private readonly viewContainer?: ViewContainerRef;

    ngOnChanges() {
        if (!this.template) {
            this.closePopup();
        } else {
            this.updateViewByTemplate(this.template);
            this.showPopup();
        }
    }

    private showPopup() {
        this.isOpenPopup = true;
    }

    private closePopup() {
        this.isOpenPopup = false;
    }

    private updateViewByTemplate(templateRef: TemplateRef<unknown>): void {
        if (this.viewContainer) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(templateRef);
        }
    }
}
