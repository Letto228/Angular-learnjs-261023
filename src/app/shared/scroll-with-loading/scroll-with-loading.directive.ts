import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './scroll-with-loading.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

    private readonly indent = 100;
    private loadDirection = LoadDirection.Forward;
    private previosScrollValue = 0;

    @HostListener('scroll')
    onScroll() {
        const scrollTop = this.elementRef.nativeElement.scrollTop;
        const scrollHeight = this.elementRef.nativeElement.scrollHeight;
        const offsetHeight = this.elementRef.nativeElement.offsetHeight;

        if (scrollTop > this.previosScrollValue) {
            this.loadDirection = LoadDirection.Forward;
        } else {
            this.loadDirection = LoadDirection.Back;
        }

        this.previosScrollValue = scrollTop;

        if (
            scrollTop + offsetHeight + this.indent > scrollHeight &&
            this.loadDirection === LoadDirection.Forward
        ) {
            this.loadData.emit(this.loadDirection);

            return;
        }

        if (scrollTop < this.indent && this.loadDirection === LoadDirection.Back) {
            this.loadData.emit(this.loadDirection);
        }
    }
}
