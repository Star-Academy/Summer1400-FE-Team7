import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {LyricsComponent} from './lyrics.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SongService} from '../../../services/song.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('LyricsComponent', () => {
    let component: LyricsComponent;
    let fixture: ComponentFixture<LyricsComponent>;
    let songService: SongService;
    let debug = DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LyricsComponent],
            providers: [SongService],
            imports: [HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LyricsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        songService = TestBed.get(SongService);
    });

    it('SongService should be injected with same instance', inject([SongService], (injectService: SongService) => {
        expect(injectService).toBe(songService);
    }));

    it('playingSongSub should not be null after ngOnInit', () => {
        let playingSongSub = component.playingSongSub;
        component.ngOnInit();
        expect(playingSongSub).not.toBeNull();
    });

    it('onBackClick() should make isPanelOpen false and emit toggleLyric', () => {
        let isPanelOpen = component.isPanelOpen;
        spyOn(component.toggleLyric, 'emit');
        component.onBackClick();
        expect(isPanelOpen).toBeFalsy();
        expect(component.toggleLyric.emit).toHaveBeenCalled();
    });

    it("playingSong's id  should  be -1 ", () => {
        let playingSong = component.playingSong;
        expect(playingSong.id).toEqual(-1);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change variables', () => {
        let name = 'new name';
        let artist = 'new artist';
        let lyrics = 'new lyrics';

        component.playingSong.name = name;
        component.playingSong.artist = artist;
        component.playingSong.lyrics = lyrics;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('#lyric-music-name')).nativeNode.innerText).toEqual(name);
        expect(fixture.debugElement.query(By.css('#lyric-music-artist')).nativeNode.innerText).toEqual(artist);
        expect(fixture.debugElement.query(By.css('.lyric-text')).nativeNode.innerText).toEqual(lyrics);
    });

    it('create lyric btn', async () => {
        let fixture = TestBed.createComponent(LyricsComponent);
        let app = fixture.debugElement.componentInstance;
        app.isPanelOpen = true;
        let compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
        spyOn(app, 'onBackClick');
        compiled.querySelector('#return').click();
        expect(app.onBackClick).toHaveBeenCalled();
    });
});
