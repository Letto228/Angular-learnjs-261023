import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ICategory} from '../../../shared/categories/category.interface';

@Component({
    selector: 'app-categories-select',
    templateUrl: './categories-select.component.html',
    styleUrls: ['./categories-select.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesSelectComponent {
    @Input() categories!: ICategory[] | null;

    constructor(private readonly router: Router) {}

    onSubCategoryClick(subCategoryId: string) {
        this.router.navigate(['products-list', subCategoryId]);
    }
}
