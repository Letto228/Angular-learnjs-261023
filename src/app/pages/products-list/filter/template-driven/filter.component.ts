import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IProductsFilter} from '../products-filter.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
    @Input() brands: string[] | null = null;

    @Output() changeFilter = new EventEmitter<IProductsFilter>();

    // name = '';

    onSubmit({brands, ...otherValues}: any) {
        const sanitizedBrands = Object.keys(brands).filter(brand => brands[brand]);

        // eslint-disable-next-line no-console
        console.log({
            ...otherValues,
            brands: sanitizedBrands,
        });
    }
}
