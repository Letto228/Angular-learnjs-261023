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

    private onElementScroll(scrollEvent: Event) {
        if (scrollEvent.target instanceof HTMLElement) {
            const {scrollHeight, scrollTop, clientHeight} = scrollEvent.target;
            const bottomOffset = scrollHeight - (clientHeight + scrollTop);

            if (
                Number(this.previousScrollOffsets.top) > ScrollOffsets.top &&
                scrollTop < ScrollOffsets.top
            ) {
                this.loadData.emit(LoadDirection.up);
            }

            if (
                Number(this.previousScrollOffsets.bottom) > ScrollOffsets.bottom &&
                bottomOffset < ScrollOffsets.bottom
            ) {
                this.loadData.emit(LoadDirection.down);
            }

            this.previousScrollOffsets = {
                top: scrollTop,
                bottom: bottomOffset,
            };
        }
    }

    ngOnInit() {
        if (this.elementRef.nativeElement instanceof HTMLElement) {
            this.subscription.add(
                fromEvent(this.elementRef.nativeElement, 'scroll').subscribe({
                    next: event => this.onElementScroll(event),
                }),
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
