import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SideMenuComponent} from './side-menu.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('SideMenuComponent', () => {
    let component: SideMenuComponent;
    let fixture: ComponentFixture<SideMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SideMenuComponent],
          imports: [  HttpClientTestingModule, RouterTestingModule],

        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});
