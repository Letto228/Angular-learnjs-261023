import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {BrandsApiService} from './brands-api.service';

@Injectable({
    providedIn: 'root',
})
export class BrandsService {
    private readonly brandsStore$ = new BehaviorSubject<string[] | null>(null);

    private loadBrandsSubscription: Subscription | null = null;

    constructor(private readonly brandsApiService: BrandsApiService) {}

    get brands$(): Observable<string[] | null> {
        return this.brandsStore$.asObservable();
    }

    loadBrands(subCategoryId?: string | null) {
        if (this.loadBrandsSubscription) {
            this.loadBrandsSubscription.unsubscribe();
        }

        this.loadBrandsSubscription = this.brandsApiService
            .getBrands$(subCategoryId)
            .subscribe(brands => {
                this.brandsStore$.next(brands);

                this.loadBrandsSubscription = null;
            });
    }
}
