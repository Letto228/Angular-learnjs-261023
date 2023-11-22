import {Directive, Output, EventEmitter, HostListener} from '@angular/core';
import {LoadDirection} from './load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    private readonly offset = 100; // отступ в пикселях от верхнего и нижнего края
    private lastScrollTop = 0;

    @HostListener('scroll', ['$event']) onScroll(event: Event) {
        const {scrollTop, scrollHeight, clientHeight} = event.target as HTMLElement;

        const needEmitSrollBottomEvent = scrollTop + clientHeight >= scrollHeight - this.offset;

        if (needEmitSrollBottomEvent && this.lastScrollTop < scrollTop) {
            this.loadData.emit(LoadDirection.DOWN);
        }

        const needEmitSrollTopEvent = scrollTop <= this.offset;

        if (needEmitSrollTopEvent && this.lastScrollTop > scrollTop) {
            this.loadData.emit(LoadDirection.UP);
        }

        this.lastScrollTop = scrollTop;
    }
}
