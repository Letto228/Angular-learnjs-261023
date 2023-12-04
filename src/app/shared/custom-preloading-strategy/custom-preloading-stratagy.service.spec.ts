import {TestBed} from '@angular/core/testing';

import {CustomPreloadingStratagyService} from './custom-preloading-stratagy.service';

describe('CustomPreloadingStratagyService', () => {
    let service: CustomPreloadingStratagyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CustomPreloadingStratagyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
