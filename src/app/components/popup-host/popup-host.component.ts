import {
    Component,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @ViewChild('dialog', {static: true})
    private readonly dialog?: ElementRef<HTMLDialogElement>;

    @ViewChild('viewPort', {static: true, read: ViewContainerRef})
    private readonly viewPort?: ViewContainerRef;

    @Input() set template(templateRef: TemplateRef<unknown> | null) {
        this.viewPort?.clear();

        if (!templateRef) {
            this.close();

            return;
        }

        this.show(templateRef);
    }

    private close() {
        this.dialog?.nativeElement.close();
    }

    private show(template: TemplateRef<unknown>) {
        this.viewPort?.createEmbeddedView(template);
        this.dialog?.nativeElement.showModal();
    }
}
