import {Params} from '@angular/router';

export const parseQueryParams = (params: Params): object => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryObject: {[key: string]: any} = {};

    for (const [key, val] of Object.entries(params)) {
        const keys = key.split('.');
        let currentObject = queryObject;

        for (let i = 0; i < keys.length; i++) {
            const nestedKey = keys[i];

            if (i === keys.length - 1) {
                currentObject[nestedKey] = val;
            } else {
                currentObject[nestedKey] = currentObject[nestedKey] || {};
                currentObject = currentObject[nestedKey];
            }
        }
    }

    return queryObject;
};
