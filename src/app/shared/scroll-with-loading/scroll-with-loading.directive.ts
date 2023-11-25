import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './scroll-with-loading.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

    private readonly indent = 100;
    private previosScrollValue = 0;

    @HostListener('scroll')
    onScroll() {
        const {scrollTop, scrollHeight, offsetHeight} = this.elementRef.nativeElement;
        let loadDirection = LoadDirection.Forward;

        if (scrollTop > this.previosScrollValue) {
            loadDirection = LoadDirection.Forward;
        } else {
            loadDirection = LoadDirection.Back;
        }

        this.previosScrollValue = scrollTop;

        const bottomCoordinateOfElement = scrollTop + offsetHeight;
        const bottomBoundingCoordinate = scrollHeight - this.indent;

        if (
            bottomCoordinateOfElement > bottomBoundingCoordinate &&
            loadDirection === LoadDirection.Forward
        ) {
            this.loadData.emit(loadDirection);

            return;
        }

        const isTopBounding = scrollTop < this.indent;
        const isDirectionBack = loadDirection === LoadDirection.Back;

        if (isTopBounding && isDirectionBack) {
            this.loadData.emit(loadDirection);
        }
    }
}
