import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ICategory} from '../../../shared/categories/category.interface';
import {Router} from "@angular/router";

@Component({
    selector: 'app-categories-select',
    templateUrl: './categories-select.component.html',
    styleUrls: ['./categories-select.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesSelectComponent {
    @Input() categories!: ICategory[] | null;

    constructor(private readonly router: Router) {
    }

    onClick(subCategory: string){
        this.router.navigate([subCategory])
    }
}
