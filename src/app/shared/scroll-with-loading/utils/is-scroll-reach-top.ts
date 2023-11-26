import { borderIndent } from "../constants/border-indent";

export function scrollReachTop(
    scrollTop: number,
    prevScrollTop: number
):boolean {
    return scrollTop < borderIndent && scrollTop < prevScrollTop;
}