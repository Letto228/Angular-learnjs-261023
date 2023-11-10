import {Component} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    rating = 5;
    ratingArray = Array(this.rating).fill(0);

    onClickBuyProduct() {
        console.log('Купить продукт, в компоненте card');
    }
}
