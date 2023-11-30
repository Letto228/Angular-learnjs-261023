import {
    Directive,
    OnChanges,
    OnDestroy,
    OnInit,
    Input,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

import {chunk} from 'lodash';
import {BehaviorSubject, map, Subject, takeUntil} from 'rxjs';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize = 3;

    private groupedItems: T[][] = [];

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly viewContainer: ViewContainerRef,
        private readonly template: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges) {
        if (appPaginationOf || appPaginationChankSize) {
            this.updateView();
        }
    }

    ngOnInit() {
        this.listenCurrentIndex();
    }

    updateView() {
        const isHide = !this.appPaginationOf?.length;

        if (isHide) {
            this.viewContainer.clear();
        }

        this.groupedItems = chunk(this.appPaginationOf, this.appPaginationChankSize);
        this.currentIndex$.next(0);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private listenCurrentIndex() {
        this.currentIndex$
            .pipe(
                map(currentIndex => this.getCurrentContext(currentIndex)),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.template, context);
            });
    }

    private getCurrentContext(currentIndex: number): IPaginationContext<T> {
        return {
            $implicit: this.groupedItems[currentIndex],
            index: currentIndex,
            pageIndexes: this.groupedItems.map((_, index) => index),
            appPaginationOf: this.appPaginationOf as T[],
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            select: (index: number) => {
                this.select(index);
            },
        };
    }

    private next() {
        const nextValue = this.currentIndex$.value + 1;
        const newIndex = this.getIndex(nextValue);

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousValue = this.currentIndex$.value - 1;
        const newIndex = this.getIndex(previousValue);

        this.currentIndex$.next(newIndex);
    }

    private getIndex(index: number) {
        const {length} = this.groupedItems;

        return (length + (index % length)) % length;
    }

    private select(index: number) {
        this.currentIndex$.next(index);
    }
}
