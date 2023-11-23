import {
    Component,
    HostBinding,
    HostListener,
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

    @ViewChild('container', {read: ViewContainerRef, static: true})
    private readonly container?: ViewContainerRef;

    @HostBinding('class')
    private borderStyle?: string = '';

    @HostListener('document:click', ['$event'])
    onClick(event: Event) {
        if (!this.template?.elementRef.nativeElement.contains(event.target)) {
            this.template = null;
            this.updateView();
        }
    }

    ngOnChanges({template}: SimpleChanges): void {
        if (template) {
            this.updateView();
        }
    }

    private updateView() {
        this.borderStyle = this.template ? 'b-popup' : '';
        this.container?.clear();

        if (this.template) {
            this.container?.createEmbeddedView(this.template);
        }
    }
}
