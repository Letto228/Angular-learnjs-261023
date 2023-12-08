import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, takeUntil} from 'rxjs';
import {isEqual} from 'lodash';
import {IProductsFilter} from '../products-filter.interface';
import {IFilterFormValues} from '../filter-form-values.interface';
import {DestroyService} from '../../../../shared/destroy/destroy.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class FilterComponent implements OnChanges, OnInit {
    @Input() brands: string[] | null = null;

    @Output() changeFilter = new EventEmitter<IProductsFilter>();

    readonly filterForm = this.formBuilder.group({
        name: '',
        brands: this.formBuilder.array<FormControl<boolean>>([]),
        priceRange: this.formBuilder.group({
            min: 0,
            max: 999999,
        }),
    });

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly destroy$: DestroyService,
    ) {}

    ngOnChanges({brands}: SimpleChanges) {
        if (brands) {
            this.updateBrandsControl();
        }
    }

    ngOnInit(): void {
        this.listenFilterFormChange();
    }

    listenFilterFormChange() {
        this.filterForm.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(isEqual),
                map(filterFormValues => {
                    return this.processFilterFormValues(filterFormValues);
                }),
                takeUntil(this.destroy$),
            )
            .subscribe(productsFilter => {
                this.changeFilter.emit(productsFilter);
            });
    }

    private processFilterFormValues(filterFormValues: IFilterFormValues) {
        const sanitizedBrands = this.brands?.filter((_, index) => filterFormValues.brands?.[index]);

        const productsFilter = {
            ...filterFormValues,
            brands: sanitizedBrands,
        } as IProductsFilter;

        return productsFilter;
    }

    private updateBrandsControl() {
        const brandsControls: Array<FormControl<boolean>> = this.brands
            ? this.brands.map(() => new FormControl(false) as FormControl<boolean>)
            : [];

        const brandsForm = new FormArray<FormControl<boolean>>(brandsControls);

        this.filterForm.setControl('brands', brandsForm);
    }
}
