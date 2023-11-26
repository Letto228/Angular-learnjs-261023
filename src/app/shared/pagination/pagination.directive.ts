import {
    Directive,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize = 6;

    private readonly currentPage$ = new BehaviorSubject<number>(0);
    private readonly pageIndexes = [1, 2, 3];
    private readonly activeIndex = 1;
    private pagesCount: number | undefined;

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf}: SimpleChanges): void {
        if (appPaginationOf) {
            this.updateView();
        }
    }

    ngOnInit() {
        this.listenCurrentPage();
    }

    private updateView() {
        const shouldShowItems = this.appPaginationOf?.length;

        if (shouldShowItems) {
            this.currentPage$.next(0);
            this.pagesCount =
                Math.ceil(this.appPaginationOf!.length / this.appPaginationChankSize) - 1;

            return;
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentPage() {
        this.currentPage$
            .pipe(map(currentPage => this.getCurrentContext(currentPage)))
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(currentPage: number): IPaginationContext<T> {
        const startProduct = currentPage * this.appPaginationChankSize;
        const endProduct = (currentPage + 1) * this.appPaginationChankSize;
        const pages = this.appPaginationOf!.slice(startProduct, endProduct);

        let pageIndexes: number[];

        if (currentPage === 0) {
            pageIndexes = [0, 1, 2];
        } else if (currentPage === this.pagesCount) {
            pageIndexes = [this.pagesCount - 2, this.pagesCount - 1, this.pagesCount];
        } else {
            pageIndexes = [currentPage - 1, currentPage, currentPage + 1];
        }

        return {
            $implicit: pages,
            pageIndexes,
            activeIndex: currentPage,
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
        const previousPage = this.currentPage$.value;

        if (previousPage === this.pagesCount) {
            return;
        }

        const nextPage = previousPage + 1;

        this.currentPage$.next(nextPage);
    }

    private back() {
        const previousPage = this.currentPage$.value;

        if (previousPage === 0) {
            return;
        }

        const nextPage = previousPage - 1;

        this.currentPage$.next(nextPage);
    }

    private selectIndex(index: number) {
        this.currentPage$.next(index);
    }
}
