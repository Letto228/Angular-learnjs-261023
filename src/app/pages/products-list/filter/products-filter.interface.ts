export interface IProductsFilter {
    name: string | null | undefined;
    brands: string[] | undefined;
    priceRange: {
        min: number | null | undefined;
        max: number | null | undefined;
    };
}
