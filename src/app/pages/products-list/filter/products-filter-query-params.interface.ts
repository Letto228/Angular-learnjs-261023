export interface IProductsQueryParams {
    name: string | null | undefined;
    brands: string[] | null | undefined;
    priceMin: number | null | undefined;
    priceMax: number | null | undefined;
}
