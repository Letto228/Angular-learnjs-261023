import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PopuphostComponent} from './popuphost.component';

describe('PopuphostComponent', () => {
    let component: PopuphostComponent;
    let fixture: ComponentFixture<PopuphostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PopuphostComponent],
        });
        fixture = TestBed.createComponent(PopuphostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
