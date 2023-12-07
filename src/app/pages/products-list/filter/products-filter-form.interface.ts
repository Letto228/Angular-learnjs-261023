export interface IProductsFilterForm {
    name: string;
    brands: boolean[];
    priceRange: {
        min: number;
        max: number;
    };
}
