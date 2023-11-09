import { Component } from '@angular/core';
import { productMock } from 'src/app/shared/products/product.mock';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  productMock = productMock;

  showDescription = false;

  onDescriptionClick(event: MouseEvent) {
    this.showDescription = !this.showDescription;
    event.stopPropagation();
  }

  onBuyClick(event: MouseEvent) {
    console.log('Купить товар');
    event.stopPropagation();
  }
}
