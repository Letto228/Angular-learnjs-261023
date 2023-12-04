import {CanMatchFn} from '@angular/router';
import {question} from './question';

export const questionCanMatchGuard: CanMatchFn = (_route, _segments) => {
    return question('Это тот конфиг который нужен?');
};
