import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @HostListener('scroll', ['$event'])
    scrollLog(event: Event) {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
