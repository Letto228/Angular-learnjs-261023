export interface IScrollWithLoadingContext<T> {
    $implicit: T;
    next: () => void;
    back: () => void;
}
