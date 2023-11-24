import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, map, Subject, takeUntil} from 'rxjs';
import {chunk} from 'lodash';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnInit, OnDestroy, OnChanges {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize = 1;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    private chanks: T[][] = [];
    private pageIndexes: number[] = [];

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnInit() {
        this.listenCurrentIndex();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges): void {
        if (appPaginationOf || appPaginationChankSize) {
            this.updateView();
        }
    }

    private listenCurrentIndex() {
        this.currentIndex$
            .pipe(
                map(currentIndex => this.getCurrentContext(currentIndex)),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(currentIndex: number): IPaginationContext<T> {
        return {
            $implicit: this.chanks[currentIndex],
            index: currentIndex,
            pageIndexes: this.pageIndexes,
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            selectIndex: (index: number) => {
                this.selectIndex(index);
            },
        };
    }

    private selectIndex(index: number) {
        this.currentIndex$.next(index);
    }

    private updateView() {
        if (this.appPaginationOf?.length) {
            this.chanks = chunk(this.appPaginationOf, this.appPaginationChankSize);
            this.pageIndexes = this.chanks.map((chank, index) => index);
            this.currentIndex$.next(0);

            return;
        }

        this.viewContainerRef.clear();
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.chanks.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastIndex = this.chanks.length - 1;
        const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

        this.currentIndex$.next(newIndex);
    }
}
