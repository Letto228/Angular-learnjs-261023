import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {IState} from './store/reducer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly applicationConfig = applicationConfigMock;

    constructor(private readonly store$: Store<IState>) {
        // this.store$.subscribe(state => {
        //     console.log(state);
        // });
    }
}
