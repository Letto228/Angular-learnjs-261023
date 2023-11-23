export interface IPaginationContext<T> {
    $implicit: T[];
    appPaginationOf: T[] | null | undefined;
    activeIndex: number;
    pageIndexes: number[];
    index: number;
    next: () => void;
    back: () => void;
    selectIndex: (newIndex: number) => void;
}
