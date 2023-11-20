import {borderOffset} from '../border-offset.const';

export function isScrollReachedTopOffcet(scrollTop: number, prevScrollTop: number): boolean {
    return scrollTop < borderOffset && scrollTop < prevScrollTop;
}
