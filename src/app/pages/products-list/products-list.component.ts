import {Component} from '@angular/core';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    cardClick() {
        /* eslint no-console: 0 */
        console.log('event_card');
    }
}
