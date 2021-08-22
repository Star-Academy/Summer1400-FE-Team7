import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MakeNewPlaylistComponent} from './make-new-playlist.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MakeNewPlaylistComponent', () => {
    let component: MakeNewPlaylistComponent;
    let fixture: ComponentFixture<MakeNewPlaylistComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MakeNewPlaylistComponent],
          imports: [  HttpClientTestingModule, RouterTestingModule],

        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MakeNewPlaylistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});
