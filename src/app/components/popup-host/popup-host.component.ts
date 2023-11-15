import {
    Component,
    ElementRef,
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
    @Input() template: TemplateRef<unknown> | null = null;

    @ViewChild('dialog', {static: true})
    private readonly dialog?: ElementRef<HTMLDialogElement>;

    @ViewChild('viewPort', {static: true, read: ViewContainerRef})
    private readonly viewPort?: ViewContainerRef;

    ngOnChanges({template}: SimpleChanges): void {
        if (template) {
            this.template ? this.show() : this.close();
        }
    }

    close() {
        this.viewPort?.clear();
        this.dialog?.nativeElement.close();
    }

    show() {
        this.viewPort?.clear();
        this.viewPort?.createEmbeddedView(this.template!);
        this.dialog?.nativeElement.showModal();
    }
}
