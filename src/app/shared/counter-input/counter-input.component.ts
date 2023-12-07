import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-counter-input',
    templateUrl: './counter-input.component.html',
    styleUrls: ['./counter-input.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: CounterInputComponent,
        },
    ],
})
export class CounterInputComponent implements ControlValueAccessor {
    @Input() step = 1;

    counter = 0;
    isDisabled = false;

    onChange: (newCounter: number) => void = () => {
        console.error('CounterInputComponent not connected');
    };

    onTouched: () => void = () => {
        console.error('CounterInputComponent not connected');
    };

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    back() {
        this.counter -= this.step;

        this.onChange(this.counter);
        this.onTouched();
    }

    next() {
        this.counter += this.step;

        this.onChange(this.counter);
        this.onTouched();
    }

    writeValue(newCounter: number) {
        this.counter = newCounter;

        this.changeDetectorRef.markForCheck();
    }

    registerOnChange(fn: (newCounter: number) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;

        this.changeDetectorRef.markForCheck();
    }
}
