import {TemplateRef} from '@angular/core';

export interface ITemplateData {
    templateRef: TemplateRef<{$implicit: string}> | null;
    context: {$implicit: string} | null;
}
