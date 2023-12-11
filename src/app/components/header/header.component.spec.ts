import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {By} from '@angular/platform-browser';
import {HeaderComponent} from './header.component';
import {HeaderModule} from './header.module';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderModule, RouterTestingModule],
        }).compileComponents;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('Клик по меню', () => {
        const menuClickOutputEmitSpy = spyOn(component.menuClick, 'emit');
        const {debugElement} = fixture;
        const menuButtonDebugElement = debugElement.query(By.css('[test-id="header-button-menu"]'));

        expect(menuButtonDebugElement).not.toBeNull();
        expect(menuClickOutputEmitSpy).not.toHaveBeenCalled();

        const trigerEvent = new Event('click');

        menuButtonDebugElement.triggerEventHandler('click', trigerEvent);

        expect(menuClickOutputEmitSpy).toHaveBeenCalled();
    });
});
