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
import {takeUntil} from 'rxjs';
import {IProductsFilter} from '../products-filter.interface';
import {IProductsQueryParams} from '../products-filter-query-params.interface';
import {DestroyService} from '../../../../shared/destroy/destroy.service';
import {ProductsFilterConstants} from '../products-filter-constants';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class FilterComponent implements OnChanges, OnInit {
    @Input() brands: string[] | null = null;
    @Input() queryParams: IProductsQueryParams | undefined = undefined;

    @Output() changeFilter = new EventEmitter<IProductsFilter>();

    private brandsFromQueryParams: IProductsQueryParams['brands'] = [];

    readonly filterForm = this.formBuilder.group({
        name: '',
        brands: this.formBuilder.array<FormControl<boolean>>([]),
        priceRange: this.formBuilder.group({
            min: ProductsFilterConstants.min,
            max: ProductsFilterConstants.max,
        }),
    });

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly destroy$: DestroyService,
    ) {}

    ngOnInit(): void {
        this.listenFormValueChanges();
        this.updateFilter();
    }

    ngOnChanges({brands}: SimpleChanges) {
        if (brands) {
            this.updateBrandsControl();
        }
    }

    private listenFormValueChanges() {
        this.filterForm.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(({brands: brandsControlsValue, ...other}) => {
                const sanitizedBrands = this.brands?.filter(
                    (_, index) => brandsControlsValue?.[index],
                );

                this.changeFilter.emit({
                    name: other.name,
                    brands: sanitizedBrands,
                    priceRange: {
                        min: other.priceRange?.min,
                        max: other.priceRange?.max,
                    },
                });
            });
    }

    private updateBrandsControl() {
        const brandsControls: Array<FormControl<boolean>> = this.brands
            ? this.brands.map(
                  brand =>
                      new FormControl(
                          this.brandsFromQueryParams
                              ? this.brandsFromQueryParams.includes(brand)
                              : false,
                      ) as FormControl<boolean>,
              )
            : [];

        const brandsForm = new FormArray<FormControl<boolean>>(brandsControls);

        this.filterForm.setControl('brands', brandsForm);
    }

    private updateFilter() {
        this.filterForm.controls.name?.setValue(this.queryParams?.name || '');

        this.brandsFromQueryParams =
            this.queryParams && this.queryParams.brands ? [...this.queryParams.brands] : [];

        this.filterForm.controls.priceRange?.controls.min.setValue(
            this.queryParams?.priceMin || ProductsFilterConstants.min,
        );
        this.filterForm.controls.priceRange?.controls.max.setValue(
            this.queryParams?.priceMax || ProductsFilterConstants.max,
        );
    }
}
