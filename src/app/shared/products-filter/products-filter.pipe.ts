import {Pipe, PipeTransform} from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Entity = Record<string, any>;

export type Filter<T extends Entity, K extends keyof T> = {
    field: K;
    match: T[K];
};

@Pipe({
    name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
    transform<T extends Entity, K extends keyof T>(
        entities?: T[],
        filter?: Filter<T, K>,
    ): T[] | null {
        if (!entities) {
            return null;
        }

        if (!filter) {
            return entities;
        }

        const filtered: T[] = [];
        const field = filter.field;
        const match = filter.match;

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
