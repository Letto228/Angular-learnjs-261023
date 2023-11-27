import {Directive, HostListener, Output, EventEmitter} from '@angular/core';
import {LoadDirection} from './load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class AppScrollWithLoadingDirective {
    private loadDirection: LoadDirection = LoadDirection.scrollTop;
    private readonly prevScrollTop = -1;
    private readonly offsetTriggerValue = 100;

    @Output()
    readonly loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', [
        '$event.target.scrollTop',
        '$event.target.clientHeight',
        '$event.target.scrollHeight',
    ])
    scroll(scrollTop: number, clientHeight: number, scrollHeight: number) {
        const outOfViewPortTop =
            scrollTop < this.offsetTriggerValue && this.loadDirection !== LoadDirection.scrollTop;

        const lowerScrollPosition = scrollHeight - clientHeight;
        const outOfViewPortBottom =
            lowerScrollPosition - scrollTop < this.offsetTriggerValue &&
            this.loadDirection !== LoadDirection.scrollBottom;

        if (outOfViewPortTop) {
            this.loadDirection = LoadDirection.scrollTop;
            this.loadData.emit(this.loadDirection);

            return;
        }

        if (outOfViewPortBottom) {
            this.loadDirection = LoadDirection.scrollBottom;
            this.loadData.emit(this.loadDirection);
        }
    }
}
