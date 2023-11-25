import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, K extends keyof T, V extends T[K]>(
        items: T[],
        propertyName: K,
        searchPropertyValue: V,
    ): T[] {
        return items.filter(item => {
            const propertyValue = item[propertyName];

            if (typeof propertyValue === 'string' && typeof searchPropertyValue === 'string') {
                return propertyValue.includes(searchPropertyValue);
            }

            return propertyValue === searchPropertyValue;
        });
    }
}
