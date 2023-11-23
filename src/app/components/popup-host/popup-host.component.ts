import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnChanges {
    @Input()
    template: TemplateRef<unknown> | null = null;

    @ViewChild('templateViewPort', {read: ViewContainerRef, static: true})
    private readonly templateViewPort?: ViewContainerRef;

    ngOnChanges({template}: SimpleChanges): void {
        if (template) {
            this.updateViewPort();
        }
    }

    updateViewPort() {
        if (this.template) {
            this.templateViewPort?.clear();
            this.templateViewPort?.createEmbeddedView(this.template);
        } else {
            this.templateViewPort?.clear();
        }
    }
}
