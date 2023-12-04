import {CanActivateFn} from '@angular/router';
import {question} from './question';

export const questionCanActivateGuard: CanActivateFn = (_route, _state) => {
    // console.log(inject(ProductsApiService));

    return question('Вы хотите перейти по данному пути?');
};
