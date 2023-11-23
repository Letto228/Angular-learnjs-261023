export interface IPaginatonContext<T> {
    $implicit: T[];
    pageIndexes: number[];
    chankeSize: number;
    index: number;
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
    selectChank: (chunkSize: number) => void;
}
