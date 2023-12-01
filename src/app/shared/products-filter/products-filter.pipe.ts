import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
    transform<T>(items: T[] | undefined | null, property: string): T[] | null | undefined {
        if (!items?.length) {
            return items;
        }

        const nameLowerCase = property.toLowerCase();

        return items.filter(item => {
            console.log(item);
            // @ts-ignore
            return (item['name'] as string).toLowerCase().includes(nameLowerCase);
        });
    }
}
