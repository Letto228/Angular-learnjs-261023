export interface IAppscrollContext<T> {
    $implicit: T;
    outRagne: number;
    load: () => void;
}
