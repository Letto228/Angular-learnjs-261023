import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @Input() set template(template: TemplateRef<unknown> | null) {
        this.popupContent?.clear();

        if (template) {
            this.isHidden = false;
            this.popupContent?.createEmbeddedView(template);
        } else {
            this.isHidden = true;
        }
    }

    @ViewChild('popupContent', {read: ViewContainerRef, static: true})
    private readonly popupContent?: ViewContainerRef;

    isHidden = true;
}
