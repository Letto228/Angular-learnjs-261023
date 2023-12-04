import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {question} from './question';

export const redirectGuard: CanActivateFn = (_route, _state) => {
    return (
        question('Хотите открыть данный путь?') || inject(Router).createUrlTree(['/products-list'])
    );
};
