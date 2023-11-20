import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {IIfContext} from './if-context.interface';

@Directive({
    selector: '[appIf]',
})
export class IfDirective<T> {
    @Input() set appIf(value: T | null | undefined) {
        const isContainerHasView = this.viewContainerRef.length;

        if (value && !isContainerHasView) {
            this.viewContainerRef.createEmbeddedView(this.templateRef, {
                appIf: value,
                $implicit: value,
            });

            return;
        }

        if (!value && isContainerHasView) {
            this.viewContainerRef.clear();
        }
    }

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IIfContext<T>>,
    ) {}

    static ngTemplateContextGuard<T>(
        _directive: IfDirective<T>,
        context: IIfContext<T>,
    ): context is IIfContext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appIf<T>(
        _directive: IfDirective<T>,
        inputValue: T | null | undefined,
    ): inputValue is T {
        return true;
    }
}
