/* eslint-disable no-console */
import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';
import {type IProduct} from '../../../shared/products/product.interface';
import {type IProductImage} from '../../../shared/products/product-image.interface';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
    readonly product: IProduct;

    private readonly productPriceFormatter = Intl.NumberFormat('ru', {
        currency: 'USD',
        style: 'currency',
        minimumFractionDigits: 2,
    });

    constructor() {
        this.product = productMock;
    }

    getFirstProductImageUrl(): IProductImage['url'] {
        const [firstProductImage] = this.product.images;

        return firstProductImage.url;
    }

    getProductPrice(price: number): string {
        const formattedPrice = this.productPriceFormatter.format(price);

        return `Price: ${formattedPrice}`;
    }

    onClickProductCard(event: MouseEvent): void {
        console.log('debug: event', event);
    }

    onClickBuyButton(event: MouseEvent): void {
        event.stopPropagation();

        if (event.currentTarget instanceof HTMLElement) {
            const {productId} = event.currentTarget.dataset;

            productId && console.log(productId);
        }
    }
}
