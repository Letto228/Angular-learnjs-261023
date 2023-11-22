export interface IPaginationContext<T> {
    $implicit: T[];
    activeIndex: number;
    pageIndexes: number[];
    index: number;
    next: () => void;
    back: () => void;
    selectIndex: (newIndex: number) => void;
}
