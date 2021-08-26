import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SongItemComponent} from './song-item.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HmsTimePipe} from 'src/app/pipes/hms-time.pipe';
import {Playlist} from 'src/app/models/playlist';
import {Song} from 'src/app/models/song';
import {SongService} from 'src/app/services/song.service';
import {By} from '@angular/platform-browser';

describe('SongItemComponent', () => {
    let component: SongItemComponent;
    let fixture: ComponentFixture<SongItemComponent>;
    let song: Song = new Song(1, 'asd', 'asd', 123, 'cover', true, 'abc', 'asd/asd', false);
    let playlist: Playlist = new Playlist('test', 1, [song]);
    let songService: SongService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SongItemComponent, HmsTimePipe],
            imports: [HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SongItemComponent);
        component = fixture.componentInstance;
        songService = TestBed.inject(SongService);
        songService.currentPlaylist = playlist;
        component.song = song;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be the correct layout', () => {
        component.layout = 'grid-view';
        component.song.isSelected = true;
        component.isPlaying = true;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.song-wrapper-grid'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('.song-wrapper-selected'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('.is-playing'))).not.toBeNull();
    });

    it('should call onSingleClick', async () => {
        let fixture = TestBed.createComponent(SongItemComponent);
        let app = fixture.debugElement.componentInstance;
        app.song = song;

        fixture.detectChanges();

        spyOn(app, 'onSingleClick');
        fixture.debugElement.query(By.css('.song-wrapper')).triggerEventHandler('click', {});
        expect(app.onSingleClick).toHaveBeenCalled();
    });

    it('should call onDoubleClick', async () => {
        let fixture = TestBed.createComponent(SongItemComponent);
        let app = fixture.debugElement.componentInstance;
        app.song = song;

        fixture.detectChanges();

        spyOn(app, 'onDoubleClick');
        fixture.debugElement.query(By.css('.song-wrapper')).triggerEventHandler('dblclick', {});
        expect(app.onDoubleClick).toHaveBeenCalled();
    });
});
