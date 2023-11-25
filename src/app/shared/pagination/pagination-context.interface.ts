export interface IPaginationContext<T> {
    $implicit: T;
    pageIndexes: number[],
    index: number,
    next: () => void;
    back: () => void;
    go: (index:number)=>void;
}
