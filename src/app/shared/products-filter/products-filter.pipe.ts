import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
    transform<T extends {name: string}>(items: T[] | undefined | null, name: string): T[] | null | undefined {
        if (!items?.length) {
            return items;
        }

        const nameLowerCase = name.toLowerCase();

        return items.filter(item => {
            return (item['name'] as string).toLowerCase().includes(nameLowerCase);
        });
    }
}
