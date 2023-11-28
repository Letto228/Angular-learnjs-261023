import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterbypropertyPipe} from './filterbyproperty.pipe';

@NgModule({
    declarations: [FilterbypropertyPipe],
    imports: [CommonModule],
    exports: [FilterbypropertyPipe],
})
export class FilterByPropertyModule {}
