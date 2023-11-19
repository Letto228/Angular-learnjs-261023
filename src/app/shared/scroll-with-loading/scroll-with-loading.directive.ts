import {Directive, Output, EventEmitter, HostListener} from '@angular/core';
import {LoadDirection} from './load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output()
    loadData = new EventEmitter<LoadDirection>();

    private lastScrollTop = 0;
    private readonly offsetTriggerValue = 100;

    @HostListener('scroll', [
        '$event.target.scrollTop',
        '$event.target.clientHeight',
        '$event.target.scrollHeight',
    ])
    onScroll(scrollTop: number, clientHeight: number, scrollHeight: number) {
        const bottomOffset = scrollHeight - clientHeight - scrollTop;
        const scrollDirection = this.lastScrollTop > scrollTop ? 'up' : 'down';

        if (scrollDirection === 'down' && bottomOffset <= this.offsetTriggerValue) {
            this.loadData.emit(LoadDirection.Bottom);
        }

        if (scrollDirection === 'up' && scrollTop <= this.offsetTriggerValue) {
            this.loadData.emit(LoadDirection.Top);
        }

        this.lastScrollTop = scrollTop;
    }
}
