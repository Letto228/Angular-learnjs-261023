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
    isClosed = false;

    @Input() template: TemplateRef<unknown> | null = null;

    @ViewChild('views', {static: true, read: ViewContainerRef})
    private readonly views?: ViewContainerRef;

    ngOnChanges({template}: SimpleChanges): void {
        if(template) {
          this.updatePopupContent(this.template);
        }
    }

    private updatePopupContent(template: TemplateRef<unknown> | null) {
        this.views?.clear();
        this.isClosed = template ? false : true;
        if (template) {
            this.views?.createEmbeddedView(template);
        }
    }
}
