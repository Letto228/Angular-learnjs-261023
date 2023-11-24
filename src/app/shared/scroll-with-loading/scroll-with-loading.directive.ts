import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    private prevScrollTop = -1;
    private readonly borderOffset = 100;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const prevScrollTop = this.prevScrollTop;

        this.prevScrollTop = scrollTop;

        if (this.isLoadUp(scrollTop, prevScrollTop)) {
            this.loadData.emit(LoadDirection.UP);
        }

        if (this.isLoadDown(scrollTop, prevScrollTop, clientHeight, scrollHeight)) {
            this.loadData.emit(LoadDirection.DOWN);
        }
    }

    private isLoadUp(scrollTop: number, prevScrollTop: number) {
        return prevScrollTop < this.borderOffset && scrollTop <= prevScrollTop;
    }

    private isLoadDown(
        scrollTop: number,
        prevScrollTop: number,
        clientHeight: number,
        scrollHeight: number,
    ) {
        return (
            clientHeight + scrollTop >= scrollHeight - this.borderOffset &&
            scrollTop >= prevScrollTop
        );
    }
}
