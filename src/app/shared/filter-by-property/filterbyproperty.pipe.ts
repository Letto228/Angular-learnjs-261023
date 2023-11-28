import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterbypropertyPipe implements PipeTransform {
    transform<T, P extends keyof T>(
        items: T[] | undefined | null,
        searchingProperty: P,
        searchValue: T[P],
    ): T[] | undefined | null {
        if (!items) {
            return items;
        }

        return items.filter(item => item[searchingProperty] === searchValue);
    }
}
