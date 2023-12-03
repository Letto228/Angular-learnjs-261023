import {UrlSegment} from '@angular/router';

export const productsListMatcher = (url: UrlSegment[]) => {
    if (url[0]?.path !== 'products-list') {
        return null;
    }

    const subCategoryId = url[1] ?? {};

    return {
        consumed: url,
        posParams: {subCategoryId},
    };
};
