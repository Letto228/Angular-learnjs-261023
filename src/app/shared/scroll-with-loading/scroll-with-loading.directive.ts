import {Directive, Output, EventEmitter, HostListener} from '@angular/core';
import {LoadDirection} from './load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', ['$event']) onScroll(event: Event) {
        const {scrollTop, scrollHeight, clientHeight} = event.target as HTMLElement;

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            this.loadData.emit(LoadDirection.DOWN);
        } else if (scrollTop <= 100) {
            this.loadData.emit(LoadDirection.UP);
        }
    }
}
