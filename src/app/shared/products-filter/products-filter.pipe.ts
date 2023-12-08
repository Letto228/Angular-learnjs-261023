import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform<T extends Record<string, any>, K extends keyof T>(
        entities: T[],
        propertyName: K | undefined | null,
        searchPropertyValue: T[K] | undefined | null,
        isCaseSensitive = false,
    ): T[] {
        if (!propertyName) {
            return entities;
        }

        let searchString =
            typeof searchPropertyValue === 'string' ? searchPropertyValue : undefined;

        if (searchString) {
            searchString = isCaseSensitive ? searchString : searchString.toLocaleLowerCase();
        }

        return entities.filter(entity => {
            const propertyValue = entity[propertyName];

            if (searchString) {
                return isCaseSensitive
                    ? propertyValue.includes(searchString)
                    : propertyValue.toLocaleLowerCase().includes(searchString);
            }

            return propertyValue === searchPropertyValue;
        });
    }
}
