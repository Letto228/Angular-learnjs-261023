import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform<T extends Record<string, any>, K extends keyof T>(
        entities?: T[],
        field?: K,
        match?: T[K],
    ): T[] | null {
        if (!entities) {
            return null;
        }

        if (!field) {
            return entities;
        }

        const filtered: T[] = [];

        entities.forEach(entity => {
            if (
                typeof entity[field] === 'string' &&
                field === 'name' &&
                (<string>entity[field]).includes(<string>match)
            ) {
                filtered.push(entity);
            } else if (entity[field] === match) {
                filtered.push(entity);
            }
        });

        return filtered;
    }
}
