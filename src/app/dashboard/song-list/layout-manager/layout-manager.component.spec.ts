import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutManagerComponent} from './layout-manager.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('LayoutManagerComponent', () => {
    let component: LayoutManagerComponent;
    let fixture: ComponentFixture<LayoutManagerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LayoutManagerComponent],
          imports: [  HttpClientTestingModule, RouterTestingModule],

        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});
