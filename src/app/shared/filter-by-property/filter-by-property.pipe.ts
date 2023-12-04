/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T extends Array<Record<string, any>>, P extends keyof T[0], V extends T[0][P]>(
        array: T,
        property: P,
        value: V,
    ) {
        return array.filter(item => {
            if (typeof property !== 'string') {
                return false;
            }

            const itemValue = item[property];

            if (typeof itemValue === 'string' && typeof value === 'string') {
                return itemValue.includes(value);
            }

            return itemValue === value;
        });
    }
}
