import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
    @Input() set template(template: TemplateRef<unknown> | null) {
        this.view?.clear();

        if (template) {
            this.view?.createEmbeddedView(template);
        }
    }

    @ViewChild('containerPopup', {read: ViewContainerRef, static: true})
    readonly view: ViewContainerRef | undefined;

    get isHidden(): boolean {
        return !!this.view?.length;
    }
}
