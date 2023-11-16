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
    templateUrl: './popuphost.component.html',
    styleUrls: ['./popuphost.component.css'],
})
export class PopuphostComponent implements OnChanges {
    @Input()
    template: TemplateRef<unknown> | null = null;

    @ViewChild('container', {read: ViewContainerRef})
    private readonly container?: ViewContainerRef;

    ngOnChanges({template}: SimpleChanges): void {
        if (template && this.template) {
            this.container?.clear();
            this.container?.createEmbeddedView(this.template);
        }

        if (!this.template) {
            this.container?.clear();
        }
    }
}
