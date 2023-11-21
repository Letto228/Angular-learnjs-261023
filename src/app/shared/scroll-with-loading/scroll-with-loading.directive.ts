import {Directive, HostListener, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {LoadDirection} from './load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() readonly loadData = new Subject<LoadDirection>();

    private prevScrollTop = -1;
    private readonly borderOffset = 100;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        this.prevScrollTop = scrollTop;
        setTimeout(() => {
            if (this.isLoadUp(scrollTop, this.prevScrollTop)) {
                this.loadData.next(LoadDirection.UP);
            }

            if (this.isLoadDown(scrollTop, this.prevScrollTop, clientHeight, scrollHeight)) {
                this.loadData.next(LoadDirection.DOWN);
            }
        }, 50);
    }

    private isLoadUp(scrollTop: number, prevScrollTop: number) {
        return scrollTop < this.borderOffset && scrollTop > prevScrollTop;
    }

    private isLoadDown(
        scrollTop: number,
        prevScrollTop: number,
        clientHeight: number,
        scrollHeight: number,
    ) {
        return (
            clientHeight + scrollTop >= scrollHeight - this.borderOffset &&
            scrollTop < prevScrollTop
        );
    }
}
