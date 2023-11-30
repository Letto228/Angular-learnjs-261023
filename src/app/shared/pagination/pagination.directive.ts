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
import {BehaviorSubject, Subject, map, takeUntil} from 'rxjs';
import {getChunks} from './utils/get-chunks';
import {IPaginationContext} from './pagination-context.interface';
import {getRange} from './utils/get-range';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize = 4;

    private chunks: T[][] | undefined;
    private pageIndexes: number[] = [];

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroyed$ = new Subject<void>();

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges): void {
        if (appPaginationOf || appPaginationChankSize) {
            this.updateView();
        }
    }

    ngOnInit(): void {
        this.listenCurrentIndex();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private updateView() {
        if (!this.appPaginationOf?.length) {
            this.viewContainerRef.clear();

            return;
        }

        this.chunks = getChunks(this.appPaginationOf, this.appPaginationChankSize);
        this.pageIndexes = getRange(this.chunks.length);
        this.currentIndex$.next(0);
    }

    private listenCurrentIndex() {
        this.currentIndex$
            .pipe(
                map(currentIndex => this.getCurrentContext(currentIndex)),
                takeUntil(this.destroyed$),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(currentIndex: number) {
        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $implicit: this.chunks![currentIndex],
            appPaginationOf: this.appPaginationOf,
            pageIndexes: this.pageIndexes,
            index: currentIndex,
            selectIndex: (index: number) => {
                this.select(index);
            },
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
        };
    }

    private next() {
        const currentIndex = this.currentIndex$.value;
        const length = this.pageIndexes.length;
        const nextIndex = (currentIndex + 1) % length;

        this.currentIndex$.next(nextIndex);
    }

    private back() {
        const currentIndex = this.currentIndex$.value;
        const length = this.pageIndexes.length;
        const nextIndex = (currentIndex - 1 + length) % length;

        this.currentIndex$.next(nextIndex);
    }

    private select(index: number) {
        this.currentIndex$.next(index);
    }

    static ngTemplateContextGuard<T>(
        _dir: PaginationDirective<T>,
        _ctx: IPaginationContext<T>,
    ): _ctx is IPaginationContext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appPaginationOf<T>(
        _dir: PaginationDirective<T>,
        _val: T[] | undefined | null,
    ): _val is T[] {
        return true;
    }
}
