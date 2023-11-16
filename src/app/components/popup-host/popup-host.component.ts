import {
    Component,
    Input,
    TemplateRef,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
    HostBinding,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnChanges {
    @Input() template: TemplateRef<unknown> | null = null;

    @HostBinding('class.container') hasTemplate = false;

    @ViewChild('viewPort', {static: true, read: ViewContainerRef})
    private readonly viewPort?: ViewContainerRef;

    ngOnChanges({template}: SimpleChanges): void {
        if (template) {
            this.updateView();
        }
    }

    private updateView() {
        this.viewPort?.clear();

        if (this.template) {
            this.viewPort?.createEmbeddedView(this.template);
        }

        this.hasTemplate = Boolean(this.template);
    }
}
