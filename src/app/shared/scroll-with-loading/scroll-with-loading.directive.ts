import {Directive, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Observable, Subject, distinctUntilChanged} from 'rxjs';
import {LoadDirection} from './load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Input('appScrollWithLoading') borderOffset = 100;
    @Output() loadData: EventEmitter<LoadDirection> = new EventEmitter();

    private readonly element: HTMLElement;
    private readonly loadDirectionSubject: Subject<LoadDirection>;
    private readonly loadDirection$: Observable<LoadDirection>;

    constructor(private readonly elementRef: ElementRef<HTMLElement>) {
        this.element = this.elementRef.nativeElement;
        this.loadDirectionSubject = new Subject<LoadDirection>();
        this.loadDirection$ = this.loadDirectionSubject.asObservable();

        this.loadDirection$
            .pipe(distinctUntilChanged(), takeUntilDestroyed())
            .subscribe(direction => {
                this.loadData.emit(direction);
            });
    }

    @HostListener('scroll')
    onElementScroll() {
        if (this.isTopReached()) {
            this.loadDirectionSubject.next(LoadDirection.Top);
        }

        if (this.isBottomReached()) {
            this.loadDirectionSubject.next(LoadDirection.Bottom);
        }
    }

    private isTopReached() {
        const scrollTop = this.element.scrollTop;

        return scrollTop < this.borderOffset;
    }

    private isBottomReached() {
        const scrollBottom =
            this.element.scrollHeight - this.element.clientHeight - this.element.scrollTop;

        return scrollBottom < this.borderOffset;
    }
}
