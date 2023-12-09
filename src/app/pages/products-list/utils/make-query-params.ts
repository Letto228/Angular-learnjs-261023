import {Params} from '@angular/router';

export const makeQueryParams = (queryObject: object): Params => {
    const params: Params = {};

    for (const [key, value] of Object.entries(queryObject)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
            const nested = makeQueryParams(value);

            for (const [keyNested, valueNested] of Object.entries(nested)) {
                params[`${key}.${keyNested}`] = valueNested;
            }
        } else {
            params[key] = value;
        }
    }

    return params;
};
