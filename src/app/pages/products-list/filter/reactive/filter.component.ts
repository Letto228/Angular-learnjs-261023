import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {debounceTime, map, takeUntil} from 'rxjs';
import {DestroyService} from 'src/app/shared/destroy/destroy.service';
import {IProductsFilter} from '../products-filter.interface';
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
export class FilterComponent implements OnChanges {
    @Input() brands: string[] | null = null;
    @Input() filter!: IProductsFilter;

    @Output() changeFilter = new EventEmitter<IProductsFilter>();

    // control = new FormControl('', {
    //     validators: [Validators.required, Validators.minLength(3)],
    //     asyncValidators: [this.isStringAsyncValidator.bind(this)],
    // });

    // private isStringAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    //     console.log('isStringAsyncValidator');

    //     return timer(3 * 1000).pipe(map(() => isStringValidator(control)));
    // }

    // errors$ = this.control.statusChanges.pipe(
    //     map(() => this.control.errors),
    //     startWith(this.control.errors),
    //     // map(status => status === 'INVALID' ? this.control.errors : null),
    // );

    // constructor() {
    //     this.control.valueChanges.pipe(startWith(this.control.value)).subscribe(console.log);
    //     this.control.statusChanges.pipe(startWith(this.control.status)).subscribe(console.log);
    // }

    // readonly filterForm = new FormGroup({
    //     name: new FormControl(''),
    //     brands: new FormArray<FormControl<boolean>>([]),
    //     priceRange: new FormGroup({
    //         min: new FormControl(0),
    //         max: new FormControl(999999),
    //     }),
    // });

    readonly filterForm = this.formBuilder.group({
        // name: new FormControl(''),
        name: '',
        // name: new FormControl('', {validators: [...]}),
        // name: ['', {validators: [...]}],
        brands: this.formBuilder.array<FormControl<boolean>>([]),
        priceRange: this.formBuilder.group({
            min: 0,
            max: 999999,
        }),
    });

    // fileControl = new FormControl();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly destroyService$: DestroyService,
    ) {
        //     console.log(this.filterForm.get('name'));
        //     console.log(this.filterForm.get('priceRange')?.get('min'));
        //     this.filterForm.get('name')?.valueChanges.subscribe(console.log);
        /*       this.filterForm.valueChanges.subscribe(({brands: brandsControlsValue, ...other}) => {
            const sanitizedBrands = this.brands?.filter((_, index) => brandsControlsValue?.[index]);

            // eslint-disable-next-line no-console
            console.log({
                ...other,
                brands: sanitizedBrands,
            });
            this.changeFilter.emit({
                ...other,
                brands: sanitizedBrands,
            });
        }); */
        //     this.fileControl.valueChanges.subscribe(console.log);
    }

    ngOnChanges({brands}: SimpleChanges) {
        if (brands) {
            this.updateFormValues(this.filter);
            this.filterForm.valueChanges
                .pipe(
                    debounceTime(500),
                    map(values => this.parseFormValues(values as IProductsFilterForm)),
                    takeUntil(this.destroyService$),
                )
                .subscribe(filter => {
                    this.changeFilter.emit(filter);
                });
        }
    }

    private updateFormValues(filter: IProductsFilter) {
        this.filterForm.get('name')?.setValue(filter.name || null);

        this.updateBrandsControls();
    }

    private parseFormValues(values: IProductsFilterForm): IProductsFilter {
        const filter: IProductsFilter = {};

        if (values.name) {
            filter.name = values.name;
        }

        const brands: string[] = [];

        this.filterForm.controls.brands.controls.forEach((formControl, index) => {
            if (formControl.value && this.brands && this.brands[index]) {
                brands.push(this.brands[index]);
            }
        });

        if (brands.length > 0) {
            filter.brands = brands;
        }

        return filter;
    }

    private updateBrandsControls() {
        const brandsControls: Array<FormControl<boolean>> = this.brands
            ? this.brands.map(
                  brandName =>
                      new FormControl(
                          this.filter.brands?.includes(brandName),
                      ) as FormControl<boolean>,
              )
            : [];

        const brandsForm = new FormArray<FormControl<boolean>>(brandsControls);

        this.filterForm.setControl('brands', brandsForm);
    }
}
