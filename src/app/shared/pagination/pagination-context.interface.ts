export interface IPaginationContext<T> {
    $implicit: T[];
    index: number;
    appPaginationOf: T[];
    pageIndexes: number[];
    next: () => void;
    back: () => void;
    select: (index: number) => void;
}
