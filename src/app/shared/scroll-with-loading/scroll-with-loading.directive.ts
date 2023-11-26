import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import { LoadDirection } from './constants/load-direction';
import { scrollReachBottom } from './utils/is-scroll-reach.bottom';
import { scrollReachTop } from './utils/is-scroll-reach-top';

@Directive({
    selector: '[appScrollWithLoading]',
})

export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    ///   Объявляем предыдущее значение для того, чтобы смотреть в каком напрвлении идет скролл
    private prevScrollTop = 0;

    @HostListener('scroll', ['$event.target'])
    ///   Достаем 
    ///   scrollTop = Верхняя граница окна клиента,
    ///   clientHeight = Высота окна клиента,
    ///   scrollHeight = Высота документа
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {

        const prevScrollTop = this.prevScrollTop;
        this.prevScrollTop = scrollTop;

        const messageBottom = scrollReachBottom(scrollTop, clientHeight, scrollHeight, prevScrollTop);
        if (messageBottom) {
            this.loadData.emit(LoadDirection.Bottom);
            
            return;
        }
        const messageTop = scrollReachTop(scrollTop, prevScrollTop);
        if (messageTop) {
            this.loadData.emit(LoadDirection.Top);
        }   
    }
}
