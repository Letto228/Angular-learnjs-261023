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
import {IProductsFilter} from '../products-filter.interface';

// function isStringValidator(control: AbstractControl): ValidationErrors | null {
//     const {value} = control;

//     return Number(value) ? {isString: `Is not sting value - ${value}`} : null;
// }

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges {
    @Input() brands: string[] | null = null;

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

    constructor(private readonly formBuilder: FormBuilder) {
        //     console.log(this.filterForm.get('name'));
        //     console.log(this.filterForm.get('priceRange')?.get('min'));
        //     this.filterForm.get('name')?.valueChanges.subscribe(console.log);
        this.filterForm.valueChanges.subscribe(({brands: brandsControlsValue, ...other}) => {
            const sanitizedBrands = this.brands?.filter((_, index) => brandsControlsValue?.[index]);

            // eslint-disable-next-line no-console
            console.log({
                ...other,
                brands: sanitizedBrands,
            });
        });
        //     this.fileControl.valueChanges.subscribe(console.log);
    }

    ngOnChanges({brands}: SimpleChanges) {
        if (brands) {
            this.updateBrandsControl();
        }
    }

    private updateBrandsControl() {
        const brandsControls: Array<FormControl<boolean>> = this.brands
            ? this.brands.map(() => new FormControl(false) as FormControl<boolean>)
            : [];

        const brandsForm = new FormArray<FormControl<boolean>>(brandsControls);

        this.filterForm.setControl('brands', brandsForm);
    }
}
