import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, K extends keyof T>(items: T[], propertyName: K, searchPropertyValue: T[K]): T[] {
        return items.filter(item => {
            const itemPropertyValue = item[propertyName];

            if (typeof itemPropertyValue === 'string' && typeof searchPropertyValue === 'string') {
                return itemPropertyValue.toLowerCase().includes(searchPropertyValue.toLowerCase());
            }

            return itemPropertyValue === searchPropertyValue;
        });
    }
}
