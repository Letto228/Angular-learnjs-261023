import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T extends object, K extends keyof T, V extends T[K]>(
        items: T[],
        propertyName: K,
        searchValue: V,
    ): T[] {
        return items.filter(item => {
            const propertyValue = item[propertyName];
            const isStringSearch =
                typeof propertyValue === 'string' && typeof searchValue === 'string';

            if (isStringSearch) {
                // Без  'as string' по какой то причине TS не понимает что здесь строка
                // Падает сборка с ошибкой TS но в редакторе распознается корректно
                return (propertyValue as string).includes(searchValue);
            }

            return propertyValue === searchValue;
        });
    }
}
