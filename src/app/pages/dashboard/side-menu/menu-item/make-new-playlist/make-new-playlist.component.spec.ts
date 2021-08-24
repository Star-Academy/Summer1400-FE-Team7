import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MakeNewPlaylistComponent} from './make-new-playlist.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';

describe('MakeNewPlaylistComponent', () => {
    let component: MakeNewPlaylistComponent;
    let fixture: ComponentFixture<MakeNewPlaylistComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MakeNewPlaylistComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
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

    it('should call createNewPlaylist', async () => {
        let fixture = TestBed.createComponent(MakeNewPlaylistComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app, 'createNewPlaylist');
        fixture.debugElement.query(By.css('#make-playlist')).triggerEventHandler('click', {});
        expect(app.createNewPlaylist).toHaveBeenCalled();
    });

    it('should call closeNewPlaylistPanel', async () => {
        let fixture = TestBed.createComponent(MakeNewPlaylistComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app, 'closeNewPlaylistPanel');
        fixture.debugElement.query(By.css('#exit-btn')).triggerEventHandler('click', {});
        expect(app.closeNewPlaylistPanel).toHaveBeenCalled();
    });
});
