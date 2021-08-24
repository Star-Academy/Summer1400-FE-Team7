import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddToPlaylistPanelComponent} from './add-to-playlist-panel.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('AddToPlaylistPanelComponent', () => {
    let component: AddToPlaylistPanelComponent;
    let fixture: ComponentFixture<AddToPlaylistPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddToPlaylistPanelComponent],
          imports: [  HttpClientTestingModule, RouterTestingModule],

        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddToPlaylistPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});
