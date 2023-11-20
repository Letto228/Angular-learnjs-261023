import {borderOffset} from '../border-offset.const';

export function isScrollReachedBottomOffcet(
    scrollTop: number,
    lowerScrollPosition: number,
    prevScrollTop: number,
): boolean {
    return lowerScrollPosition - scrollTop < borderOffset && scrollTop > prevScrollTop;
}
