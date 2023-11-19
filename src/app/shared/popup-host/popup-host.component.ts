import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
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
    @HostBinding('style.display') display: string | null = null;

    private set changeDisplay(value: TemplateRef<ViewContainerRef>) {
        this.display = value ? 'block' : null;
    }

    @Input() template: TemplateRef<ViewContainerRef> | null = null;

    @ViewChild('viewPort', {read: ViewContainerRef})
    private readonly viewPort?: ViewContainerRef;

    ngOnChanges({template}: SimpleChanges) {
        const {currentValue} = template;

        this.changeDisplay = currentValue;
        this.viewPort?.clear();

        if (currentValue) {
            this.viewPort?.createEmbeddedView(currentValue);
        }
    }
}
