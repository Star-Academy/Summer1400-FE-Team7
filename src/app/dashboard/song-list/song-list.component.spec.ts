import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SongListComponent} from './song-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('SongListComponent', () => {
    let component: SongListComponent;
    let fixture: ComponentFixture<SongListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SongListComponent],
          imports: [  HttpClientTestingModule, RouterTestingModule],

        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SongListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});
