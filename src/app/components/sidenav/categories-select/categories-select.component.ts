import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ICategory} from '../../../shared/categories/category.interface';
import {CategoriesStoreService} from '../../../shared/categories/categories-store.service';

@Component({
    selector: 'app-categories-select',
    templateUrl: './categories-select.component.html',
    styleUrls: ['./categories-select.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesSelectComponent {
    @Input() categories!: ICategory[] | null;

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly categoriesStoreService: CategoriesStoreService,
    ) {}

    navigateToSubCategory(id: string) {
        this.router.navigate(['productCategory/', id], {
            relativeTo: this.activatedRoute,
        });
    }
}
