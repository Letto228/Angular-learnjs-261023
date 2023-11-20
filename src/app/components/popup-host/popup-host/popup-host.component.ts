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
        if (!this.viewContainer) {
            return;
        }

        this.viewContainer.clear();

        if (this.template) {
            this.viewContainer.createEmbeddedView(this.template);
        }

        this.isOpenPopup = Boolean(this.template);
    }
}
