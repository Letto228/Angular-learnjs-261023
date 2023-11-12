import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {IPurchasedProduct} from 'src/app/shared/products/purchased-product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | undefined = undefined;

    @Output() readonly productBuyClick = new EventEmitter<IPurchasedProduct>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        const purchasedProductObj: IPurchasedProduct = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            _id: this.product!._id,
            name: this.product!.name,
            price: this.product!.price,
        };

        // eslint-disable-next-line no-console
        console.log('Buy product', purchasedProductObj);

        this.productBuyClick.emit(purchasedProductObj);
    }

    isStarActive(starIndex: number): boolean {
        if (this.product?.rating) {
            return this.product?.rating >= starIndex;
        }

        return false;
    }
}
