import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @Input() set template(template: TemplateRef<unknown> | null) {
        this.updatePopupContent(template);
    }

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewportViewContainer?: ViewContainerRef;

    private updatePopupContent(template: TemplateRef<unknown> | null) {
        this.viewportViewContainer?.clear();

        if (template) {
            this.viewportViewContainer?.createEmbeddedView(template);
        }
    }

    get isViewportClear(): boolean {
        return !this.viewportViewContainer?.length;
    }
}
// @Component({
//     selector: 'app-popup-host',
//     templateUrl: './popup-host.component.html',
//     styleUrls: ['./popup-host.component.css'],
// })
// export class PopupHostComponent implements OnChanges {
//     @Input() template: TemplateRef<unknown> | null = null;

//     @ViewChild('viewport', {read: ViewContainerRef, static: true})
//     private readonly viewportViewContainer?: ViewContainerRef;

//     ngOnChanges({template}: SimpleChanges) {
//         if (template) {
//             this.updatePopupContent(this.template);
//         }
//     }

//     private updatePopupContent(template: TemplateRef<unknown> | null) {
//         this.viewportViewContainer?.clear();

//         if (template) {
//             this.viewportViewContainer?.createEmbeddedView(template);
//         }
//     }
// }
