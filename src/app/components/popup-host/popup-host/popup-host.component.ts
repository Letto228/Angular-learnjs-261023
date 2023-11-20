import {
    Input,
    Component,
    ViewChild,
    OnChanges,
    TemplateRef,
    ViewContainerRef,
    SimpleChanges,
} from '@angular/core';

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

    ngOnChanges({template}: SimpleChanges) {
        if (template) {
            this.updateViewByTemplateRef();
        }
    }

    private updateViewByTemplateRef(): void {
        if (!this.template) {
            this.isOpenPopup = false;
            this.viewContainer?.clear();
        }

        if (this.template && this.viewContainer) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.template);
        }
    }
}
