import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayControllersComponent} from './play-controllers.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('PlayControllersComponent', () => {
    let component: PlayControllersComponent;
    let fixture: ComponentFixture<PlayControllersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlayControllersComponent],
          imports: [  HttpClientTestingModule, RouterTestingModule],

        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayControllersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});
