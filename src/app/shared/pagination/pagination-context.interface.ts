export interface IPaginationContext<T> {
    $implicit: T[];
    back: () => void;
    next: () => void;
    selectIndex: (index: number) => void;
    index: number;
    pageIndexes: number[];
}
