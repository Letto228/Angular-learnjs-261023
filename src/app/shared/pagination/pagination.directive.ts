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
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize = 4;

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
        this.listenCurrentIndexChange();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView() {
        const isViewContainerNeedBeEmpty = !this.appPaginationOf?.length;

        if (isViewContainerNeedBeEmpty) {
            this.viewContainer.clear();

            return;
        }

        this.groupedItems = chunk(this.appPaginationOf, this.appPaginationChankSize);
        this.currentIndex$.next(0);
    }

    private listenCurrentIndexChange() {
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
            selectIndex: (index: number) => {
                this.selectIndex(index);
            },
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.groupedItems.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        const newIndex = previousIndex >= 0 ? previousIndex : this.groupedItems.length - 1;

        this.currentIndex$.next(newIndex);
    }

    private selectIndex(index: number) {
        this.currentIndex$.next(index);
    }

    static ngTemplateContextGuard<T>(
        _directive: PaginationDirective<T>,
        _context: unknown,
    ): _context is IPaginationContext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appPaginationOf<T>(
        _directive: PaginationDirective<T>,
        _inputValue: T[] | undefined | null,
    ): _inputValue is T[] {
        return true;
    }
}
