import {
    Component,
    Input,
    SimpleChanges,
    TemplateRef,
    OnChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnChanges {
    @Input() template: TemplateRef<unknown> | null = null;
    @ViewChild('viewPort', {static: true, read: ViewContainerRef})
    private readonly viewPort?: ViewContainerRef;

    ngOnChanges({template}: SimpleChanges): void {
        if (template) {
            this.changePopupContent(this.template);
        }
    }

    private changePopupContent(template: TemplateRef<unknown> | null) {
        this.viewPort?.clear();

        if (template) {
            this.viewPort?.createEmbeddedView(template);
        }
    }
}
