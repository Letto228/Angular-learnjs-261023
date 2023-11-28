import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {Direction, offset} from './scroll-loading.const';

@Directive({
    selector: '[appScrollLoading]',
    standalone: true,
})
export class ScrollLoadingDirective {
    @Output() loadData = new EventEmitter<Direction>();

    protected scrollTop = 0;

    @HostListener('scroll', ['$event'])
    onMouseScroll(event: Event) {
        const {scrollTop, clientHeight, scrollHeight} = event.target as HTMLElement;

        // Проверяем, что спускаемся вниз
        if (this.scrollTop < scrollTop) {
            if (clientHeight + scrollTop > scrollHeight - offset) {
                // Генерируем событие с направлением вниз
                this.loadData.emit(Direction.Bottom);
            }
        } else if (scrollTop < offset) {
            // Или поднимаемся наверх
            // Генерируем событие с направлением вверх
            this.loadData.emit(Direction.Top);
        }

        this.scrollTop = scrollTop;
    }
}
