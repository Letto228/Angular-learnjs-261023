import {Directive, ElementRef, HostListener, Input, Output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Subject, distinctUntilChanged} from 'rxjs';
import {LoadDirection} from './load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Input('appScrollWithLoading') borderOffset = 100;
    private readonly element: HTMLElement = this.elementRef.nativeElement;
    private readonly loadDirection$ = new Subject<LoadDirection>();
    @Output()
    loadData = this.loadDirection$.pipe(distinctUntilChanged(), takeUntilDestroyed());

    private prevDirection = LoadDirection.Top;

    constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

    @HostListener('scroll')
    onElementScroll() {
        if (this.prevDirection === LoadDirection.Bottom && this.isTopReached()) {
            this.loadDirection$.next(LoadDirection.Top);
            this.prevDirection = LoadDirection.Top;
        }

        if (this.prevDirection === LoadDirection.Top && this.isBottomReached()) {
            this.loadDirection$.next(LoadDirection.Bottom);
            this.prevDirection = LoadDirection.Bottom;
        }
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
}
