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
import {ICarouselContext} from './carousel-context.inteface';

@Directive({
    selector: '[appCarousel]',
})
export class CarouselDirective<T> implements OnChanges, OnInit {
    @Input() appCarouselOf: T[] | undefined | null;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<ICarouselContext<T>>,
    ) {}

    ngOnChanges({appCarouselOf}: SimpleChanges) {
        if (appCarouselOf) {
            this.updateView();
        }
    }

    ngOnInit() {
        this.listenCurrentIndex();
    }

    private updateView() {
        const shouldShowItems = this.appCarouselOf?.length;

        if (shouldShowItems) {
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

    private getCurrentContext(currentIndex: number): ICarouselContext<T> {
        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $implicit: this.appCarouselOf![currentIndex],
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            // back: this.back.bind(this),
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = nextIndex < this.appCarouselOf!.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastIndex = this.appCarouselOf!.length - 1;
        const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

        this.currentIndex$.next(newIndex);
    }
}
