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
import {Observable, debounceTime, map, takeUntil} from 'rxjs';
import {IProductsFilter} from '../products-filter.interface';
import {DestroyService} from '../../../../shared/destroy/destroy.service';
import {IProductsFilterForm} from '../products-filter-form.interface';

// function isStringValidator(control: AbstractControl): ValidationErrors | null {
//     const {value} = control;

//     return Number(value) ? {isString: `Is not sting value - ${value}`} : null;
// }

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class FilterComponent implements OnChanges, OnInit {
    @Input() brands: string[] | null = null;
    @Input() initialFilter!: IProductsFilter;

    @Output() changeFilter = new EventEmitter<IProductsFilter>();
    // Output by stream
    // @Output() readonly changeFilter: Observable<IProductsFilter>;

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
    ) {
        // Необходимо делать это в конструкторе, т.к. при создании потока нужна уже созданная форма (filterForm)
        // this.changeFilter = this.getFilterStream$();
    }

    ngOnInit() {
        this.listenFormChange();
        this.updateInitialFormValue();
    }

    ngOnChanges({brands}: SimpleChanges) {
        if (brands) {
            this.updateBrandsControl();
        }
    }

    private updateInitialFormValue() {
        const {name, priceRange} = this.initialFilter;

        this.filterForm.patchValue({name, priceRange});
    }

    private updateBrandsControl() {
        const savedBrands = this.initialFilter.brands;

        const brandsControls: Array<FormControl<boolean>> = this.brands
            ? this.brands.map(
                  brand => new FormControl(savedBrands.includes(brand)) as FormControl<boolean>,
              )
            : [];

        const brandsForm = new FormArray<FormControl<boolean>>(brandsControls);

        this.filterForm.setControl('brands', brandsForm);
    }

    private listenFormChange() {
        const changeFormValue$ = this.filterForm.valueChanges as Observable<IProductsFilterForm>;

        changeFormValue$
            .pipe(
                debounceTime(300),
                map(formValue => ({
                    ...formValue,
                    brands: this.getSelectedBrands(formValue.brands),
                })),
                takeUntil(this.destroy$),
            )
            .subscribe(filter => {
                this.changeFilter.emit(filter);
            });
    }

    private getSelectedBrands(brandSelection: boolean[]): IProductsFilter['brands'] {
        return this.brands ? this.brands.filter((_brand, index) => brandSelection[index]) : [];
    }

    // Output by stream
    // private getFilterStream$(): Observable<IProductsFilter> {
    //     return this.filterForm.valueChanges.pipe(
    //         map(
    //             ({brands, name, ...otherValues}) =>
    //                 ({
    //                     ...otherValues,
    //                     name,
    //                     brands: this.getBrandsListFromArray(brands as boolean[]),
    //                 } as IProductsFilter),
    //         ),
    //     );
    // }
}
