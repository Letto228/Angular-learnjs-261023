import { Component } from '@angular/core';
import { productMock } from 'src/app/shared/products/product.mock';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  cardTitle = productMock.name;
  cardPrice = productMock.price;
  imgSrc = productMock.images[0].url;

  showDescription = false;

  onDescriptionClick(e: MouseEvent) {
    this.showDescription = !this.showDescription;
    e.stopPropagation();
  }

  onBuyClick(e: MouseEvent) {
    console.log('Купить товар');
    e.stopPropagation();
  }
}
