import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import { LoadDirection } from './load-direction';

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

        const MessageBottom = this.scrollReachBottom(scrollTop, clientHeight, scrollHeight, prevScrollTop);
        if (MessageBottom) {
            this.loadData.emit(LoadDirection.Bottom)            
        }
        const MessageTop = this.scrollReachTop(scrollTop, prevScrollTop);
        if (MessageTop) {
            this.loadData.emit(LoadDirection.Top)
        }
        
    }

    //  Функция, высчитывающая сколько осталось от нижней границы видимого окна до нижней границы документа
    scrollReachBottom(
        scrollTop: number,
        clienHeight: number,
        scrollHeight: number,
        prevScrollTop: number
    ):boolean {
        return scrollHeight - clienHeight - scrollTop < 100 && scrollTop > prevScrollTop;
    }

    scrollReachTop(
        scrollTop: number,
        prevScrollTop: number
    ):boolean {
        return scrollTop < 100 && scrollTop < prevScrollTop;
    }
}
