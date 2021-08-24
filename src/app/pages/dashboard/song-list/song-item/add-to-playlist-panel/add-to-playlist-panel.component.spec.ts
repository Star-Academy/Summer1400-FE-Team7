import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddToPlaylistPanelComponent} from './add-to-playlist-panel.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('AddToPlaylistPanelComponent', () => {
    let component: AddToPlaylistPanelComponent;
    let fixture: ComponentFixture<AddToPlaylistPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddToPlaylistPanelComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
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

    it('should call closeNewPlaylistPanel', async () => {
        let fixture = TestBed.createComponent(AddToPlaylistPanelComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app, 'closeNewPlaylistPanel');
        fixture.debugElement.query(By.css('#close-btn')).triggerEventHandler('click', {});
        expect(app.closeNewPlaylistPanel).toHaveBeenCalled();
    });

    it('should call closeNewPlaylistPanel', async () => {
        let fixture = TestBed.createComponent(AddToPlaylistPanelComponent);
        let app = fixture.debugElement.componentInstance;
        app.isCreatePlaylistPanelOpen = false;
        fixture.detectChanges();
        fixture.debugElement.query(By.css('.make-new-playlist-wrapper')).triggerEventHandler('click', {});
        expect(app.isCreatePlaylistPanelOpen).toEqual(true);
    });

    it('should call createNewPlaylist', async () => {
        let fixture = TestBed.createComponent(AddToPlaylistPanelComponent);
        let app = fixture.debugElement.componentInstance;
        app.isCreatePlaylistPanelOpen = true;
        fixture.detectChanges();
        spyOn(app, 'createNewPlaylist');
        fixture.debugElement.query(By.css('#create-btn')).triggerEventHandler('click', {});
        expect(app.createNewPlaylist).toHaveBeenCalled();
    });

    it('should call onCancelClick', async () => {
        let fixture = TestBed.createComponent(AddToPlaylistPanelComponent);
        let app = fixture.debugElement.componentInstance;
        app.isCreatePlaylistPanelOpen = true;
        fixture.detectChanges();
        spyOn(app, 'onCancelClick');
        fixture.debugElement.query(By.css('#exit-btn')).triggerEventHandler('click', {});
        expect(app.onCancelClick).toHaveBeenCalled();
    });
});
