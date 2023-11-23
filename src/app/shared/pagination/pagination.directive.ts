import {
    Directive,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {chunk} from 'lodash';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges {
    @Input() appPaginationOf: T[] | null | undefined = [];
    @Input() appPaginationChankSize = 1;

    private chanks: T[][] = [];
    private pageIndexes: number[] = [];
    private currentIndex = 0;

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges) {
        if (appPaginationOf || appPaginationChankSize) {
            this.currentIndex = 0;
            this.updateChanksData();
            this.updateView();
        }
    }

    private updateChanksData() {
        const canCalculate = this.appPaginationOf?.length && this.appPaginationChankSize;
        const chanks: T[][] = canCalculate
            ? chunk(this.appPaginationOf, this.appPaginationChankSize)
            : [];
        const pageIndexes = [...chanks.keys()];

        this.chanks = chanks;
        this.pageIndexes = pageIndexes;
    }

    private updateView() {
        this.viewContainerRef.clear();

        const shouldShowItems = this.chanks.length && this.appPaginationChankSize;

        if (shouldShowItems) {
            this.viewContainerRef.createEmbeddedView(this.templateRef, this.getCurrentContext());
        }
    }

    private getCurrentContext(): IPaginationContext<T> {
        return {
            $implicit: this.chanks[this.currentIndex],
            appPaginationOf: this.appPaginationOf,
            index: this.currentIndex,
            activeIndex: this.currentIndex,
            pageIndexes: this.pageIndexes,
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            selectIndex: (newIndex: number) => {
                this.selectIndex(newIndex);
            },
        };
    }

    private next() {
        const nextPageIndex = this.currentIndex + 1;

        if (nextPageIndex < this.chanks.length) {
            this.currentIndex = nextPageIndex;
            this.updateView();
        }
    }

    private back() {
        const previousPageIndex = this.currentIndex - 1;

        if (previousPageIndex >= 0) {
            this.currentIndex = previousPageIndex;
            this.updateView();
        }
    }

    private selectIndex(newIndex: number) {
        const newIndexInRange = newIndex >= 0 && newIndex < this.chanks.length;

        if (newIndexInRange) {
            this.currentIndex = newIndex;
            this.updateView();
        }
    }

    static ngTemplateContextGuard<T>(
        _directive: PaginationDirective<T>,
        context: IPaginationContext<T>,
    ): context is IPaginationContext<T> {
        return true;
    }
}
