import {BehaviorSubject, map} from 'rxjs';
import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {IPaginatonContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnInit {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize: number | undefined | null;

    private readonly currentPageIndex = new BehaviorSubject<number>(0);
    private pageIndexes = new Array<number>();

    private currentPageProducts = new Array<T[]>();

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginatonContext<T>>, // todo change any
    ) {}

    ngOnInit(): void {
        this.splitProducts();
        this.listenCurrentIndex();
    }

    private getCurrentContext(index: number): IPaginatonContext<T> {
        return {
            $implicit: this.currentPageProducts[index],
            pageIndexes: this.pageIndexes,
            index: this.currentPageIndex.value,
            chankeSize: this.appPaginationChankSize!,
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
                this.appPaginationChankSize = chankSize;
                this.splitProducts();
                this.currentPageIndex.next(0);
            },
        };
    }

    private listenCurrentIndex() {
        this.currentPageIndex
            .pipe(map(index => this.getCurrentContext(index)))
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private splitProducts() {
        this.currentPageProducts = new Array<T[]>();
        this.pageIndexes = [1];
        let productPage: T[] = [];

        this.appPaginationOf?.forEach(p => {
            if (productPage.length >= this.appPaginationChankSize!) {
                this.currentPageProducts.push(productPage);
                this.pageIndexes.push(this.pageIndexes.length + 1);
                productPage = [];
            }

            productPage?.push(p);
        });

        if (productPage.length > 0) {
            this.currentPageProducts.push(productPage);
        }
    }

    next() {
        const nextIndex = this.currentPageIndex.value + 1;
        const newIndex = nextIndex < this.currentPageProducts.length ? nextIndex : 0;

        this.currentPageIndex.next(newIndex);
    }

    back() {
        const nextIndex = this.currentPageIndex.value - 1;
        const newIndex = nextIndex <= 0 ? this.currentPageProducts.length - 1 : nextIndex;

        this.currentPageIndex.next(newIndex);
    }
}
