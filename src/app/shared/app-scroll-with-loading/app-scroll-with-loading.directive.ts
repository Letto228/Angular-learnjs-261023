import {Directive, Output, EventEmitter, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Subscription, fromEvent} from 'rxjs';
import {LoadDirection, ScrollOffsets} from './constants';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class AppScrollWithLoadingDirective implements OnInit, OnDestroy {
    @Output()
    readonly loadData = new EventEmitter<LoadDirection>();

    private readonly subscription = new Subscription();

    private previousScrollOffsets: {top: null | number; bottom: null | number} = {
        top: null,
        bottom: null,
    };

    constructor(private readonly elementRef: ElementRef) {}

    private onElementScroll(scrollElement: HTMLElement) {
        const {scrollHeight, scrollTop, clientHeight} = scrollElement;
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

    ngOnInit() {
        if (this.elementRef.nativeElement instanceof HTMLElement) {
            this.subscription.add(
                fromEvent(this.elementRef.nativeElement, 'scroll').subscribe({
                    next: event => {
                        if (event.target instanceof HTMLElement) {
                            this.onElementScroll(event.target);
                        }
                    },
                }),
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
