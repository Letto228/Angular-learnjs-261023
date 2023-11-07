import {CUSTOM_ELEMENTS_SCHEMA, Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {IProduct} from 'src/app/shared/products/product.interface';
import {productMock} from 'src/app/shared/products/product.mock';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatDividerModule, MatChipsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardComponent {
    @Input() productModel: IProduct = productMock;

    get backgroundImage() {
        return `url(${this.productModel.images[0].url})`;
    }

    cardClicked = false;

    onCardClick() {
        if (this.cardClicked) {
            return;
        }

        this.cardClicked = true;
    }

    onBuyClick() {
        if (this.cardClicked) {
            // eslint-disable-next-line no-console
            console.log(`Buy button click`);
        }
    }
}
