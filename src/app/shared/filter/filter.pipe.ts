import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from '../products/product.interface';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform<T extends IProduct, K extends keyof T>(value: T[], name: K, propValue: T[K]): T[] {
        return value.filter((item: T) => {
            if (Object.hasOwn(item, name)) {
                if (typeof propValue === 'string') {
                    const regExp = new RegExp(propValue);

                    return regExp.test(String(item[name]));
                }

                return item[name] === propValue;
            }

            return false;
        });
    }
}
