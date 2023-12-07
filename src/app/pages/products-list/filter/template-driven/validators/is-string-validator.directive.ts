import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
    selector: '[appIsStringValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: IsStringValidatorDirective,
        },
    ],
})
export class IsStringValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        const {value} = control;

        return Number(value) ? {isString: `Is not sting value - ${value}`} : null;
    }
}
