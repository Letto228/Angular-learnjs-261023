export interface IPaginationContext<T> {
    pageIndexes: number[];
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
    index: number;
    $implicit: T[];
}
