export interface IFilterFormValues {
    name: string;
    brands: boolean[];
    priceRange: {
        min: number;
        max: number;
    };
}
