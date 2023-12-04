import {TestBed} from '@angular/core/testing';
import {CanActivateChildFn} from '@angular/router';

import {questionCanActivateChildGuard} from './question-can-activate-child.guard';

describe('questionCanActivateChildGuard', () => {
    const executeGuard: CanActivateChildFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => questionCanActivateChildGuard(...guardParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
