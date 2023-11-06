import {Component} from '@angular/core';

@Component({
    selector: 'app-root', // любой css селектор ('div#root')
    templateUrl: './app.component.html',
    // template: `
    //     <h1>Hello</h1>
    // `,
    styleUrls: ['./app.component.css'],
    // styles: ['h1 {color: red}'],
    interpolation: ['{{', '}}'],
})
export class AppComponent {
    title = 'Angular-learnjs-261023';
    userName = 'Egor';
    window = window;

    getUserName() {
        return this.userName;
    }

    onHeaderClick() {
        // eslint-disable-next-line no-console
        console.log('Header click');
    }

    onKeyDown(event: Event) {
        if ((event as any).code === 'Enter') {
            // eslint-disable-next-line no-console
            console.log('Enter', event);

            return;
        }

        // eslint-disable-next-line no-console
        console.log('Another', event);
    }
}
