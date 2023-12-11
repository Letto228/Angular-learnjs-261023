import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of, take} from 'rxjs';
import {MemoizedSelector} from '@ngrx/store';
import {ProductsListComponent} from './products-list.component';
import {ProductsListModule} from './products-list.module';
import {BrandsService} from '../../shared/brands/brands.service';
import {selectProducts} from '../../store/products/products.selectors';
import {productsMock} from '../../shared/products/products.mock';
import {IState} from '../../store/reducer';
import {IProduct} from '../../shared/products/product.interface';
import {loadProducts} from '../../store/products/products.actions';

describe('ProductsListComponent', () => {
    let component: ProductsListComponent;
    let fixture: ComponentFixture<ProductsListComponent>;
    let mockStore: MockStore;
    let dispatchSpy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductsListModule, RouterTestingModule, BrowserAnimationsModule],
            providers: [
                {
                    provide: BrandsService,
                    useValue: {
                        brands$: of([]),
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        loadBrands(_subCategoryId?: string | null) {},
                    },
                },
                provideMockStore(),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        mockStore = TestBed.inject(MockStore);

        mockStore.overrideSelector(
            selectProducts as MemoizedSelector<IState, IProduct[]>,
            productsMock,
        );

        dispatchSpy = spyOn(mockStore, 'dispatch');

        fixture = TestBed.createComponent(ProductsListComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('Загрузка данных', complete => {
        expect(dispatchSpy).toHaveBeenCalledWith(loadProducts(null));

        component.products$.pipe(take(1)).subscribe({
            next: value => {
                expect(value).toEqual(productsMock);
            },
            // complete: () => {
            //     done();
            // },
            complete,
        });
    });
});
