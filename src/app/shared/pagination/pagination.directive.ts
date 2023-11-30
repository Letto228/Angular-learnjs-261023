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
import {chunk} from 'lodash';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize = 4;

    private groupedItems: Array<T>[] = [];

    private readonly currentIndex$ = new BehaviorSubject<number>(0);

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

    private updateView() {
        const shouldShowItems = !this.appPaginationOf?.length;    

        if (shouldShowItems) {
            this.viewContainerRef.clear();

            return;
        }        

        this.groupedItems = chunk(this.appPaginationOf, this.appPaginationChankSize)
        this.currentIndex$.next(0);
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
            $implicit: this.groupedItems[currentIndex],
            index: currentIndex,
            pageIndexes: this.groupedItems.map((item, index) => index),
            appPaginationOf: this.appPaginationOf!,
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = nextIndex < this.groupedItems.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = previousIndex >= 0 ? previousIndex : this.groupedItems.length - 1;

        this.currentIndex$.next(newIndex);
    }

    private selectIndex(index: number) {
        this.currentIndex$.next(index);
    }
}
