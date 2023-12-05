import {UrlSegment} from '@angular/router';

const productsListSegmentPath = 'products-list';
const productsListSegmentIndex = 0;
const subCategoryIdSegmentIndex = 1;

export const productsListMatcher = (url: UrlSegment[]) => {
    const isProductsListMatched = url[productsListSegmentIndex]?.path === productsListSegmentPath;

    if (!isProductsListMatched) {
        return null;
    }

    const subCategoryIdSegment = url[subCategoryIdSegmentIndex];

    return {
        consumed: url,
        posParams: subCategoryIdSegment ? {subCategoryId: subCategoryIdSegment} : undefined,
    };
};
