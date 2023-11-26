import {Directive, Output, EventEmitter, HostListener} from '@angular/core';
import {LoadDirection, ScrollOffsets} from './constants';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class AppScrollWithLoadingDirective {
    @Output()
    readonly loadData = new EventEmitter<LoadDirection>();

    private previousScrollOffsets: {top: null | number; bottom: null | number} = {
        top: null,
        bottom: null,
    };

    @HostListener('scroll', ['$event.target'])
    private onScroll(targetElement: HTMLElement) {
        const {scrollHeight, scrollTop, clientHeight} = targetElement;
        const bottomOffset = scrollHeight - (clientHeight + scrollTop);

        const isScrollUp =
            this.previousScrollOffsets.top !== null &&
            this.previousScrollOffsets.top > ScrollOffsets.top &&
            scrollTop < ScrollOffsets.top;

        const isScrollDown =
            this.previousScrollOffsets.bottom !== null &&
            this.previousScrollOffsets.bottom > ScrollOffsets.bottom &&
            bottomOffset < ScrollOffsets.bottom;

        if (isScrollUp) {
            this.loadData.emit(LoadDirection.up);
        }

        if (isScrollDown) {
            this.loadData.emit(LoadDirection.down);
        }

        this.previousScrollOffsets = {
            top: scrollTop,
            bottom: bottomOffset,
        };
    }
}
