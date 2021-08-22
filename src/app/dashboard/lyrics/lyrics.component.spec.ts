import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LyricsComponent} from './lyrics.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('LyricsComponent', () => {
    let component: LyricsComponent;
    let fixture: ComponentFixture<LyricsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LyricsComponent],
          imports: [  HttpClientTestingModule, RouterTestingModule],

        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LyricsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});
