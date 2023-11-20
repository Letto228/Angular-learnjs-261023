import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadingDirection} from './loading-direction.type';
import {borderOffset} from './border-offset.const';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadingDirection>();
    private eventSent = false;

    @HostListener('scroll', ['$event.target'])
    scrollHandler(target: HTMLElement) {
        const topSpace = target.scrollTop;
        const bottomSpace = target.scrollHeight - target.clientHeight - target.scrollTop;

        if (!this.eventSent && topSpace <= borderOffset) {
            this.loadData.emit(LoadingDirection.Top);
            this.eventSent = true;
        }

        if (!this.eventSent && bottomSpace <= borderOffset) {
            this.loadData.emit(LoadingDirection.Bottom);
            this.eventSent = true;
        }

        if (this.eventSent === true && topSpace > borderOffset && bottomSpace > borderOffset) {
            this.eventSent = false;
        }
    }
}
