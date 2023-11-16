export interface ICarouselContext<T> {
    $implicit: T;
    next: () => void;
    back: () => void;
}
