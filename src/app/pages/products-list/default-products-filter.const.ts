export const DEFAULT_PRODUCTS_FILTER = {
    name: '' as string,
    brands: [] as string[],
    priceRange: {
        min: 0 as number,
        max: 8888888 as number,
    },
} as const;
