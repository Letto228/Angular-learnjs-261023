import {Component, OnInit} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
    onClick(event: MouseEvent) {
        // eslint-disable-next-line no-console
        console.log('Button click');
        event.stopPropagation();
    }

    product = productMock;
    columns?: number;

    // Cards
    breakPoints() {
        switch (true) {
            case window.innerWidth <= 796:
                this.columns = 1;
                break;
            case window.innerWidth > 797 && window.innerWidth <= 1233:
                this.columns = 2;
                break;
            case window.innerWidth > 1234 && window.innerWidth <= 1597:
                this.columns = 3;
                break;
            default:
                this.columns = 4;
        }
    }

    ngOnInit(): void {
        // Contact list
        this.breakPoints();
    }
    // eslint-disable-next-line
    onResize(event: Event) {
        this.breakPoints();
    }
}
