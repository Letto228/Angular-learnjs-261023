import {Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {IPaginationContext} from "./pagination-context.interface";

@Directive({
  selector: '[appPagination]'
})
export class PaginationDirective<T> implements OnChanges, OnInit{
    @Input() appPaginationOf!: T[]
    @Input() appPaginationChankSize: number = 5;

    private readonly currentPageIndex$ = new BehaviorSubject<number>(0);

    private pageCount!:number;
    private pageIndexes!:number[]


  constructor( private readonly viewContainerRef: ViewContainerRef,
               private readonly templateRef: TemplateRef<IPaginationContext<T[]>>,
               ) { }

    ngOnChanges({appPaginationOf}: SimpleChanges) {
      if(appPaginationOf){
          this.updateView();
      }
    }

    ngOnInit() {
        this.pageCount = this.appPaginationOf ? Math.ceil(this.appPaginationOf?.length/this.appPaginationChankSize) : 0;
        this.pageIndexes = new Array(this.pageCount);
        this.listenCurrentIndex();
    }

    private updateView() {
        const shouldShowItems = this.appPaginationOf?.length;

        if (shouldShowItems) {
            this.currentPageIndex$.next(0);
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentIndex() {
        this.currentPageIndex$
            .pipe(map(currentPageIndex$ => this.getCurrentContext(currentPageIndex$)))
            .subscribe((context:IPaginationContext<T[]>) => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(currentPageIndex: number): IPaginationContext<T[]> {
      const startPosition:number = this.appPaginationChankSize*currentPageIndex || 0;
      const chankSize = this.appPaginationChankSize || 0;
      const chankCards= this.appPaginationOf?.slice(startPosition, startPosition + chankSize);

        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $implicit: chankCards,
            pageIndexes: this.pageIndexes,
            index: currentPageIndex,
            next: () => {
                this.next();
            },
            back: () => {
                this.back()
            },
            go: (index:number)=>{
                this.go(index)
            }
        };
    }

    private next() {
      if(this.currentPageIndex$.value + 1 < this.pageCount){
          const nextIndex = this.currentPageIndex$.value + 1;
          const newIndex = nextIndex < this.appPaginationOf!.length ? nextIndex : 0;

          this.currentPageIndex$.next(newIndex);
      }
    }

    private back() {
        if(this.currentPageIndex$.value - 1 >= 0){
            const previousIndex = this.currentPageIndex$.value - 1;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const lastIndex = this.appPaginationOf!.length - 1;
            const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

            this.currentPageIndex$.next(newIndex);
        }

    }

    private go(index:number){
        this.currentPageIndex$.next(index)
    }

}
