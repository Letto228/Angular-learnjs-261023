import {Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LoadDirection} from './load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective implements OnInit, OnDestroy {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private downIntersectionObserver: IntersectionObserver | undefined;
    private upIntersectionObserver: IntersectionObserver | undefined;

    private downTargetElement: Element | undefined;
    private upTargetElement: Element | undefined;
    private hasIntersection = false;

    constructor(private readonly elementRef: ElementRef) {}

    ngOnInit(): void {
        this.prepareDownIntersectionObserver();
        this.prepareUpIntersectionObserver();
    }

    private prepareDownIntersectionObserver(): void {
        this.downIntersectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && this.hasIntersection) {
                        this.loadData.emit(LoadDirection.Up);
                    }

                    if (!this.hasIntersection && !entry.isIntersecting) {
                        this.hasIntersection = true;
                    }
                });
            },
            {
                root: this.elementRef.nativeElement,
                rootMargin: '100px 0px 0px 0px',
                threshold: 1,
            },
        );

        this.downTargetElement = this.elementRef.nativeElement.firstElementChild;

        if (this.downTargetElement) {
            this.downIntersectionObserver.observe(this.downTargetElement);
        }
    }

    private prepareUpIntersectionObserver(): void {
        this.upIntersectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadData.emit(LoadDirection.Down);
                    }
                });
            },
            {
                root: this.elementRef.nativeElement,
                rootMargin: '0px 0px 100px 0px',
                threshold: 1,
            },
        );

        this.upTargetElement = this.elementRef.nativeElement.lastElementChild;

        if (this.upTargetElement) {
            this.upIntersectionObserver.observe(this.upTargetElement);
        }
    }

    ngOnDestroy(): void {
        this.unObserve();
    }

    private unObserve(): void {
        this.downIntersectionObserver?.disconnect();
        this.upIntersectionObserver?.disconnect();
    }
}
