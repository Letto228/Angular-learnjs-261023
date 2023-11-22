import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadingDirection} from './loading-direction.type';
import {borderOffset} from './border-offset.const';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() readonly loadData = new EventEmitter<LoadingDirection>();
    private eventSent = false;
    private previousScrollTop = 0;

    @HostListener('scroll', ['$event.target'])
    scrollHandler({scrollHeight, clientHeight, scrollTop}: HTMLElement) {
        const bottomSpace = scrollHeight - clientHeight - scrollTop;
        const centerSpace = scrollTop > borderOffset && bottomSpace > borderOffset;
        const scrollDelta = scrollTop - this.previousScrollTop;

        this.previousScrollTop = scrollTop;

        if (!this.eventSent && scrollTop <= borderOffset && scrollDelta < 0) {
            this.loadData.emit(LoadingDirection.Top);
            this.eventSent = true;
        }

        if (!this.eventSent && bottomSpace <= borderOffset && scrollDelta > 0) {
            this.loadData.emit(LoadingDirection.Bottom);
            this.eventSent = true;
        }

        if (this.eventSent && centerSpace) {
            this.eventSent = false;
        }
    }
}
