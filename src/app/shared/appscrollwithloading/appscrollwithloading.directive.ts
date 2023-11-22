import {Directive, HostListener, Output, EventEmitter} from '@angular/core';
import {LoadDirection} from './load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class AppScrollWithLoadingDirective {
    private loadDirection: LoadDirection = LoadDirection.scrollBottom;
    private startDirection = 0;
    private readonly offsetTriggerValue = 100;

    @Output()
    readonly loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', ['$event.target.scrollTop', '$event.target.clientHeight'])
    scroll(scrollTop: number, clientHeight: number) {
        const outOfViewPortTop: boolean = scrollTop + this.offsetTriggerValue > clientHeight;
        const outOfViewPortBottom: boolean =
            scrollTop - this.offsetTriggerValue < this.offsetTriggerValue;

        if (this.startDirection <= this.offsetTriggerValue) {
            this.startDirection = scrollTop;

            return;
        }

        if (outOfViewPortTop && this.loadDirection !== LoadDirection.scrollTop) {
            this.loadDirection = LoadDirection.scrollTop;
            this.loadData.emit(this.loadDirection);

            return;
        }

        if (outOfViewPortBottom && this.loadDirection !== LoadDirection.scrollBottom) {
            this.loadDirection = LoadDirection.scrollBottom;
            this.loadData.emit(this.loadDirection);
        }
    }
}
