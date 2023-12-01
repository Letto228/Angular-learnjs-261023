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
    ): T[] | null {
        if (!fieldName) {
            return entities;
        }

        const filtered: T[] = [];

        entities.forEach(entity => {
            if (typeof entity[fieldName] === 'string') {
                const fieldValue = caseSensitive
                    ? <string>entity[fieldName]
                    : (<string>entity[fieldName]).toLocaleLowerCase();
                const searchValue = caseSensitive
                    ? <string>match
                    : (<string>match).toLocaleLowerCase();

                if (fieldValue.includes(searchValue)) {
                    filtered.push(entity);
                }
            } else if (entity[fieldName] === match) {
                filtered.push(entity);
            }
        });

        return filtered;
    }
}
