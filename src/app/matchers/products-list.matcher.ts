import {UrlMatcher} from '@angular/router';

export const productsListMatcher: UrlMatcher = urlSegments => {
    const path = urlSegments[0]?.path;

    if (path === 'products-list') {
        const id = urlSegments[1];

        return {
            consumed: urlSegments,
            posParams: id ? {id} : undefined,
        };
    }

    return null;
};
