import {FormControl} from '@angular/forms';
import {IsStringValidatorDirective} from './is-string-validator.directive';

describe('IsStringValidatorDirective', () => {
    it('Форма с числом', () => {
        const directive = new IsStringValidatorDirective();
        const error = directive.validate(new FormControl('2000'));

        expect(error).toEqual({isString: `Is not sting value - 2000`});
    });

    it('Форма без числа', () => {
        const directive = new IsStringValidatorDirective();
        const error = directive.validate(new FormControl('Hello'));

        expect(error).toEqual(null);
    });
});
