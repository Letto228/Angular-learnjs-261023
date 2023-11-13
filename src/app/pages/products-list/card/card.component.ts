import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { productMock } from 'src/app/shared/products/product.mock';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class CardComponent {
    productMock = productMock;

    buyClick(event: Event) {
        event.stopPropagation();
        console.log('event_buy');
    }
}


