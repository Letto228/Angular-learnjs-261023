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
import {DestroyService} from '../../../../shared/destroy/destroy.service';
import {IFilterFormValues} from '../filter-form-values.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class FilterComponent implements OnChanges, OnInit {
    @Input() brands: string[] | null = null;
    @Input() filter: IProductsFilter | null = null;
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

    ngOnChanges({brands, filter}: SimpleChanges) {
        if (brands) {
            this.updateBrandsControl();
        }

        if (filter) {
            this.updateFilterForm();
        }
    }

    ngOnInit(): void {
        this.listenFilterFormChange();
    }

    updateFilterForm() {
        this.updateBrandsControl();

        const name = this.filter?.name ?? '';
        const priceRange = {
            min: Number(this.filter?.priceRange?.min) || 0,
            max: Number(this.filter?.priceRange?.max) || 999999,
        };

        this.filterForm.patchValue({
            name,
            priceRange,
        });
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
        const brandsFilter = this.filter?.brands ?? [];

        const brandsControls: Array<FormControl<boolean>> = this.brands
            ? this.brands.map(
                  brand => new FormControl(brandsFilter.includes(brand)) as FormControl<boolean>,
              )
            : [];

        const brandsForm = new FormArray<FormControl<boolean>>(brandsControls);

        this.filterForm.setControl('brands', brandsForm);
    }
}
