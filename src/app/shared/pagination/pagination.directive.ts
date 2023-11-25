import {
    Directive,
    ViewContainerRef,
    TemplateRef,
    Input,
    SimpleChanges,
    OnChanges,
    OnInit,
} from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize = 2;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private arrayByPages: T[][] = [];

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges) {
        if (appPaginationOf || appPaginationChankSize) {
            this.updateView();
        }
    }

    ngOnInit() {
        this.listenCurrentIndex();
    }

    private separationByPages() {
        let elementIndex = 0;
        let chankIndex = 0;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        while (elementIndex < this.appPaginationOf!.length) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.arrayByPages[chankIndex++] = this.appPaginationOf!.slice(
                elementIndex,
                elementIndex + this.appPaginationChankSize,
            );
            elementIndex += this.appPaginationChankSize;
        }
    }

    private updateView() {
        const shouldShowItems = this.appPaginationOf?.length;

        if (shouldShowItems) {
            this.separationByPages();
            this.currentIndex$.next(0);
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentIndex() {
        this.currentIndex$
            .pipe(map(currentIndex => this.getCurrentContext(currentIndex)))
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(currentIndex: number): IPaginationContext<T> {
        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $implicit: this.arrayByPages![currentIndex],
            index: currentIndex,
            pageIndexes: this.getPageIndexes(),
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            selectIndex: index => {
                this.selectIndex(index);
            },
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = nextIndex < this.arrayByPages!.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastIndex = this.arrayByPages!.length - 1;
        const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

        this.currentIndex$.next(newIndex);
    }

    private getPageIndexes() {
        return this.arrayByPages.map((_, index) => index);
    }

    private selectIndex(index: number) {
        this.currentIndex$.next(index);
    }

    static ngTemplateContextGuard<T>(
        _directive: PaginationDirective<T>,
        context: IPaginationContext<T>,
    ): context is IPaginationContext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appPaginationOf<T>(
        _directive: PaginationDirective<T>,
        inputValue: T[] | null | undefined,
    ): inputValue is T[] {
        return true;
    }
}
