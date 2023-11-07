import {Component} from '@angular/core';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    onCardClick($event: MouseEvent) {
        // eslint-disable-next-line no-alert
        alert('Card click');
        $event.preventDefault();
    }
}
