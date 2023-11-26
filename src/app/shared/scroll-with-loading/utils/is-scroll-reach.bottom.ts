import { borderIndent } from "../constants/border-indent";

export function scrollReachBottom(
    scrollTop: number,
    clienHeight: number,
    scrollHeight: number,
    prevScrollTop: number
):boolean {
    return scrollHeight - clienHeight - scrollTop < borderIndent && scrollTop > prevScrollTop;
}