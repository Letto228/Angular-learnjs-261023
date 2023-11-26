/* eslint-disable no-console */

import {
    Input,
    Directive,
    OnChanges,
    TemplateRef,
    SimpleChanges,
    ViewContainerRef,
} from '@angular/core';
import {splitArrayIntoChunks} from 'src/app/utils';

type PaginationDirectiveContext<T> = {
    $implicit: T[];
    index: number;
    pageIndexes: number[];

    next: VoidFunction;
    back: VoidFunction;
    selectIndex: (index: number) => void;
};

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges {
    @Input()
    appPaginationOf: T[] | null | undefined = [];

    @Input()
    appPaginationChankSize = 1;

    private index = 0;
    private pageIndexes: number[] = [];
    private paginationChunks: T[][] = [];

    constructor(
        private readonly template: TemplateRef<unknown>,
        private readonly viewContainer: ViewContainerRef,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges) {
        if (appPaginationOf && appPaginationChankSize) {
            this.updatePaginationChunks();
            this.updateViewContainer();
        }
    }

    private updatePaginationChunks() {
        this.index = 0;

        this.paginationChunks = splitArrayIntoChunks(
            this.appPaginationOf ?? [],
            this.appPaginationChankSize,
        );

        this.pageIndexes = Array.from(this.paginationChunks.keys());
    }

    private next() {
        const nextIndex = this.index + 1;

        if (this.pageIndexes.includes(nextIndex)) {
            this.index = nextIndex;
            this.updateViewContainer();
        }
    }

    private back() {
        const prevIndex = this.index - 1;

        if (this.pageIndexes.includes(prevIndex)) {
            this.index = prevIndex;
            this.updateViewContainer();
        }
    }

    private setIndex(index: number) {
        if (index === this.index || !this.pageIndexes.includes(index)) {
            return;
        }

        this.index = index;
        this.updateViewContainer();
    }

    private updateViewContainer() {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.template, this.getDirectiveContext());
    }

    private getDirectiveContext(): PaginationDirectiveContext<T> {
        const $implicit = this.paginationChunks[this.index];

        return {
            $implicit,
            index: this.index,
            pageIndexes: this.pageIndexes,
            next: () => this.next(),
            back: () => this.back(),
            selectIndex: (index: number) => this.setIndex(index),
        };
    }

    static ngTemplateContextGuard<T>(
        _directive: PaginationDirective<T>,
        context: PaginationDirectiveContext<T>,
    ): context is PaginationDirectiveContext<T> {
        return true;
    }
}
