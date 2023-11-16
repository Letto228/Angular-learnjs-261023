import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[appInsertShadow]',
})
export class InsertShadowDirective {
    // New

    private boxShadowActive = false;

    @HostListener('click')
    onClick() {
        this.boxShadowActive = !this.boxShadowActive;
    }

    @HostBinding('style.boxShadow') private get boxShadow(): string {
        return this.boxShadowActive ? 'inset 0 0 10px #000' : '';
    }

    // Old

    // @HostListener('click') // (domEvent)="..."
    // onClick() {
    //     this.boxShadow = !this.boxShadow ? 'inset 0 0 10px #000' : '';
    // }
    // // <host-element appInsertShadow (click)="logClick()">

    // @HostBinding('style.boxShadow') private boxShadow = '';
    // // <host-element appInsertShadow [style.boxShadow]="boxShadow">

    /* ------------------------------------------------------------ */

    // @HostListener('touchstart', [
    //     '$event.changedTouches[0].clientX',
    //     '$event.changedTouches[0].clientY',
    // ])
    // @HostListener('mousedown', ['$event.clientX', '$event.clientY'])
    // logClick(x: number, y: number) {
    //     console.log('clicked', this.boxShadow, x, y);

    //     // return false;
    // }

    // @HostListener('touchstart', ['$event'])
    // @HostListener('mousedown', ['$event'])
    // logClick(event: PointerEvent | TouchEvent) {
    //     if (event instanseof TouchEvent) {...}

    //     console.log('clicked', this.boxShadow, x, y);

    //     // return false;
    // }

    // constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    //     this.elementRef.nativeElement;
    // }
}
