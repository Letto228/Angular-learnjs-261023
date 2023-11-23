import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'currency',
    pure: true,
})
export class CurrencyPipe implements PipeTransform {
    transform(price: number | undefined, _currencyCode?: string, _pattern?: string): string {
        // eslint-disable-next-line no-console
        // console.log('CurrencyPipe calculated', price, currencyCode, pattern);

        return `${price || '-'} $`;
    }
}
