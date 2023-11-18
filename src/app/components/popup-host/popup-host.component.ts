import {
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    OnChanges,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnChanges, OnInit {
    @Input() template: TemplateRef<unknown> | null = null;

    @ViewChild('viewPort', {static: true, read: ViewContainerRef})
    private readonly viewPort?: ViewContainerRef | null = null;

    ngOnChanges({template}: SimpleChanges) {
        this.viewPort?.clear();

        if (this.template) {
            this.viewPort?.createEmbeddedView(this.template);
        }
    }
}
