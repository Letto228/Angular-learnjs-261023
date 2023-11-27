import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {LoadDirection} from './load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Input('appScrollWithLoading') borderOffset = 100;
    private readonly element: HTMLElement = this.elementRef.nativeElement;
    @Output() loadData = new EventEmitter<LoadDirection>();
    private isMiddleReachedBefore = false;

    constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

    @HostListener('scroll')
    onElementScroll() {
        if (this.isMiddleReachedBefore && this.isTopReached()) {
            this.loadData.emit(LoadDirection.Top);
        }

        if (this.isMiddleReachedBefore && this.isBottomReached()) {
            this.loadData.emit(LoadDirection.Bottom);
        }

        this.isMiddleReachedBefore = this.isMiddleReached();
    }

    private isTopReached() {
        const scrollTop = this.element.scrollTop;

        return scrollTop < this.borderOffset;
    }

    private isBottomReached() {
        const {scrollHeight, clientHeight, scrollTop} = this.element;
        const scrollBottom = scrollHeight - clientHeight - scrollTop;

        return scrollBottom < this.borderOffset;
    }

    private isMiddleReached() {
        return !this.isBottomReached() && !this.isTopReached();
    }
}
