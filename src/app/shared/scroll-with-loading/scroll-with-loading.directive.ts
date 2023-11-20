import {Directive, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<string>();

    @HostListener('scroll', [
        '$event.srcElement.scrollTop',
        '$event.srcElement.scrollHeight',
        '$event.srcElement.clientHeight',
    ])
    onScroll(top: number, height: number, clientHeight: number) {
        const topOffset = Number(top);
        const bottomOffset = Number(height) - Number(clientHeight) - Number(top);

        if (topOffset < 100) {
            this.loadData.emit('addTop');
        } else if (bottomOffset < 100) {
            this.loadData.emit('addBottom');
        }
    }
}
