import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';
import {getCurrency} from '../../../shared/currency/currency';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
    @Input() product: IProduct | null = null;

    @Output() readonly buy = new EventEmitter<IProduct['_id']>();

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        setInterval(() => {
            this.changeDetectorRef.markForCheck();
        }, 1000);
    }

    onProductBuy(event: Event) {
        event.stopPropagation();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.buy.emit(this.product!._id);
    }

    isStarActive(starIndex: number): boolean {
        return !!(this.product && this.product.rating >= starIndex);
    }

    getCurrency = getCurrency;
}
