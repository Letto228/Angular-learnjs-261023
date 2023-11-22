import {
    Directive,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges {
    @Input() appPaginationOf: T[] = [];
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
            this.calculateChanksData();
            this.updateView();
        }
    }

    private calculateChanksData() {
        const pageIndexes: number[] = [];
        const chanks: T[][] = [];

        const canCalculate = this.appPaginationOf?.length && this.appPaginationChankSize;

        if (canCalculate) {
            let chank: T[] = [];
            let pageIndex = 0;

            for (let index = 0; index < this.appPaginationOf.length; index++) {
                const item = this.appPaginationOf[index];
                const needAddNewChank = index && index % this.appPaginationChankSize === 0;

                if (needAddNewChank) {
                    chanks.push(chank);
                    pageIndexes.push(pageIndex);

                    chank = [];
                    pageIndex++;
                }

                chank.push(item);
            }

            if (chank.length) {
                chanks.push(chank);
                pageIndexes.push(pageIndex);
            }
        }

        this.chanks = chanks;
        this.pageIndexes = pageIndexes;
    }

    private updateView() {
        this.viewContainerRef.clear();

        const shouldShowItems = this.chanks?.length && this.appPaginationChankSize;

        if (shouldShowItems) {
            this.viewContainerRef.createEmbeddedView(this.templateRef, this.getCurrentContext());
        }
    }

    private getCurrentContext(): IPaginationContext<T> {
        return {
            $implicit: this.chanks[this.currentIndex],
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
