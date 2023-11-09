import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    mockImg = productMock.images[0].url;
    altImg = productMock.images[1].url;
    mockId = productMock._id;
    mockName = productMock.name;
    mockPrice = productMock.price;

    cardClick(event: Event) {
        // console.log('Click on ', event.target)
        return event.target;
    }

    buttonClick(event: MouseEvent) {
        event?.stopImmediatePropagation();
    }
}
