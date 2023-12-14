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
import {debounceTime, map, takeUntil} from 'rxjs';
import {IProductsFilter} from '../products-filter.interface';
import {DestroyService} from '../../../../shared/destroy/destroy.service';
import {IFilterFormValues} from '../filter-form-values.interface';
import {DEFAULT_PRODUCTS_FILTER} from '../../default-products-filter.const';

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
        name: DEFAULT_PRODUCTS_FILTER.name,
        brands: this.formBuilder.array<FormControl<boolean>>([]),
        priceRange: this.formBuilder.group({
            min: DEFAULT_PRODUCTS_FILTER.priceRange.min,
            max: DEFAULT_PRODUCTS_FILTER.priceRange.max,
        }),
    });

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly destroy$: DestroyService,
    ) {}

    ngOnChanges({brands, filter}: SimpleChanges) {
        if (brands || filter) {
            this.updateBrandsControl();
        }

        if (filter) {
            this.updateFilterForm();
        }
    }

    ngOnInit(): void {
        this.listenFilterFormChange();
    }

    private updateFilterForm() {
        // console.log('updateFilterForm', this.filter);

        const name = this.filter?.name ?? DEFAULT_PRODUCTS_FILTER.name;
        const priceRange = {
            min: Number(this.filter?.priceRange?.min) || DEFAULT_PRODUCTS_FILTER.priceRange.min,
            max: Number(this.filter?.priceRange?.max) || DEFAULT_PRODUCTS_FILTER.priceRange.max,
        };

        this.filterForm.patchValue({
            name,
            priceRange,
        });
    }

    private listenFilterFormChange() {
        this.filterForm.valueChanges
            .pipe(
                debounceTime(500),
                map(filterFormValues =>
                    this.processFilterFormValues(filterFormValues as IFilterFormValues),
                ),
                takeUntil(this.destroy$),
            )
            .subscribe(productsFilter => {
                this.changeFilter.emit(productsFilter);
            });
    }

    private processFilterFormValues(filterFormValues: IFilterFormValues): IProductsFilter {
        const sanitizedBrands = this.brands?.filter((_, index) => filterFormValues.brands?.[index]);

        return {
            ...filterFormValues,
            brands: sanitizedBrands,
        } as IProductsFilter;
    }

    private updateBrandsControl() {
        const brandsFilter = this.filter?.brands ?? DEFAULT_PRODUCTS_FILTER.brands;

        const brandsControls: Array<FormControl<boolean>> = this.brands
            ? this.brands.map(
                  brand => new FormControl(brandsFilter.includes(brand)) as FormControl<boolean>,
              )
            : [];

        const brandsForm = new FormArray<FormControl<boolean>>(brandsControls);

        this.filterForm.setControl('brands', brandsForm);
    }
}
