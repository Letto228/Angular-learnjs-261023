import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform<T extends Record<string, any>, K extends keyof T>(
        entities: T[],
        fieldName?: K,
        match?: T[K],
        caseSensitive?: boolean,
    ): T[] {
        if (!fieldName) {
            return entities;
        }

        const searchString =
            // eslint-disable-next-line no-nested-ternary
            typeof match !== 'string' ? null : caseSensitive ? match : match.toLocaleLowerCase();

        return entities.filter(entity => {
            const fieldValue = entity[fieldName];

            if (searchString) {
                return caseSensitive
                    ? fieldValue.includes(searchString)
                    : fieldValue.toLocaleLowerCase().includes(searchString);
            }

            if (fieldValue === match) {
                return true;
            }

            return false;
        });
    }
}
