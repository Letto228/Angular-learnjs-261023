/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<
        T extends any[],
        P extends T[0] extends Record<string, any> ? keyof T[0] : never,
        V extends T[0] extends Record<string, any>
            ? P extends keyof T[0]
                ? T[0][P]
                : never
            : never,
    >(array: T, property: P, value: V) {
        return array.filter(item => {
            const itemValue = item[property];

            if (typeof itemValue === 'string' && typeof value === 'string') {
                return itemValue.includes(value);
            }

            return itemValue === value;
        });
    }
}
