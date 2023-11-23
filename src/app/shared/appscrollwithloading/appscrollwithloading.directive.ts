import {Directive, HostListener, Output, EventEmitter} from '@angular/core';
import {LoadDirection} from './load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class AppScrollWithLoadingDirective {
    private loadDirection: LoadDirection = LoadDirection.scrollTop;
    private readonly startDirection = 0;
    private readonly offsetTriggerValue = 100;

    @Output()
    readonly loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', [
        '$event.target.scrollTop',
        '$event.target.clientHeight',
        '$event.target.scrollHeight',
    ])
    scroll(scrollTop: number, clientHeight: number, scrollHeight: number) {
        const outOfViewPortTop: boolean = scrollTop < this.offsetTriggerValue;
        const outOfViewPortBottom: boolean =
            scrollHeight > scrollTop && clientHeight - this.offsetTriggerValue < scrollTop;

        if (!outOfViewPortTop && !outOfViewPortBottom) {
            this.loadDirection = LoadDirection.scrollActive;

            return;
        }

        if (outOfViewPortTop && this.loadDirection === LoadDirection.scrollActive) {
            this.loadDirection = LoadDirection.scrollTop;
            this.loadData.emit(this.loadDirection);

            return;
        }

        if (outOfViewPortBottom && this.loadDirection === LoadDirection.scrollActive) {
            this.loadDirection = LoadDirection.scrollBottom;
            this.loadData.emit(this.loadDirection);
        }
    }
}
