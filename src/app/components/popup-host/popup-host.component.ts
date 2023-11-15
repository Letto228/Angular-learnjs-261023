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
        if (!template) {
            return;
        }

        if (this.template) {
            this.viewPort?.clear();
            this.viewPort?.createEmbeddedView(this.template);
            this.hasTemplate = true;
        } else {
            this.viewPort?.clear();
            this.hasTemplate = false;
        }
    }
}
