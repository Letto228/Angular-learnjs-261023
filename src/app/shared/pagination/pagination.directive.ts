import {BehaviorSubject, map} from 'rxjs';
import {
    Directive,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {chunk} from 'lodash';
import {IPaginatonContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnInit, OnChanges {
    @Input() appPaginationOf: T[] | undefined | null;

    private chunkedPages: T[][] = [];

    private readonly currentPageIndex = new BehaviorSubject<number>(0);
    private paginationChankSize = 3;

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginatonContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf}: SimpleChanges): void {
        if (appPaginationOf) {
            this.updateView();
        }
    }

    ngOnInit(): void {
        this.updateView();
    }

    private getCurrentContext(index: number): IPaginatonContext<T> {
        return {
            $implicit: this.chunkedPages[index],
            pageIndexes: this.chunkedPages.map((_, index) => index),
            appPaginationOf: this.appPaginationOf as T[],
            index: this.currentPageIndex.value,
            chankeSize: this.paginationChankSize!,
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            selectIndex: index => {
                this.currentPageIndex.next(index);
            },
            selectChank: chankSize => {
                this.paginationChankSize = chankSize;
                this.currentPageIndex.next(0);
                this.updateView();
            },
        };
    }

    private updateView() {
        this.chunkedPages = chunk(this.appPaginationOf, this.paginationChankSize);
        this.listenCurrentIndex();
    }

    private listenCurrentIndex() {
        this.currentPageIndex
            .pipe(map(index => this.getCurrentContext(index)))
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    next() {
        const nextIndex = this.currentPageIndex.value + 1;
        const newIndex = nextIndex < this.chunkedPages.length ? nextIndex : 0;

        this.currentPageIndex.next(newIndex);
    }

    back() {
        const nextIndex = this.currentPageIndex.value - 1;
        const newIndex = nextIndex <= 0 ? this.chunkedPages.length - 1 : nextIndex;

        this.currentPageIndex.next(newIndex);
    }
}
