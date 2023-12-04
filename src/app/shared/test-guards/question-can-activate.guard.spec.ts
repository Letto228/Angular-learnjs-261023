import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {questionCanActivateGuard} from './question-can-activate.guard';

describe('questionCanActivateGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => questionCanActivateGuard(...guardParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
