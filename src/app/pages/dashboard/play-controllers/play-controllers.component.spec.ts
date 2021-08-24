import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayControllersComponent} from './play-controllers.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {PlayControllerService} from '../../../services/play-controller.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';


describe('PlayControllersComponent', () => {
    let component: PlayControllersComponent;
    let fixture: ComponentFixture<PlayControllersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlayControllersComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayControllersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('onMuteClick() should make volumeBarValue 0 if isMute = false', () => {
        component.isMute = false;
        component.onMuteClick();
        fixture.detectChanges();
        let volumeBarValue = component.volumeBarValue;
        expect(volumeBarValue).toEqual(0);
    });
    it('onMuteClick() should make volumeBarValue not 0 if isMute = true', () => {
        component.isMute = true;
        component.onMuteClick();
        fixture.detectChanges();
        let volumeBarValue = component.volumeBarValue;
        expect(volumeBarValue).not.toEqual(0);
    });

    it('onPlay() should call  playController.play if status = statusType.STOPPED', () => {
        let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
        fixture.detectChanges();
        spyOn(playControllerService, 'play');
        component.status = playControllerService.statusTypes.STOPPED;
        component.onPlay();
        expect(playControllerService.play).toHaveBeenCalled();
    });

    it('onPlay() should call  playController.pause if status = statusType.PLAYING', () => {
        let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
        fixture.detectChanges();
        spyOn(playControllerService, 'pause');
        component.status = playControllerService.statusTypes.PLAYING;
        component.onPlay();
        expect(playControllerService.pause).toHaveBeenCalled();
    });

    it('onPlay() should call  playController.resume if status = statusType.PAUSED', () => {
        let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
        fixture.detectChanges();
        spyOn(playControllerService, 'resume');
        component.status = playControllerService.statusTypes.PAUSED;
        component.onPlay();
        expect(playControllerService.resume).toHaveBeenCalled();
    });
    it('onPlay() should call  playController.pause in other case of status ', () => {
        let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
        fixture.detectChanges();
        spyOn(playControllerService, 'pause');
        component.status = playControllerService.statusTypes.LOADING;
        component.onPlay();
        expect(playControllerService.pause).toHaveBeenCalled();
        component.status = playControllerService.statusTypes.MUTED;
        component.onPlay();
        expect(playControllerService.pause).toHaveBeenCalled();
    });

    it('onNextSong() should call  playController.nextSong()  ', () => {
        let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
        fixture.detectChanges();
        spyOn(playControllerService, 'nextSong');
        component.onNextSong();
        expect(playControllerService.nextSong).toHaveBeenCalled();
    });

    it('onPreviousSong() should call  playController.previousSong()  ', () => {
        let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
        fixture.detectChanges();
        spyOn(playControllerService, 'previousSong');
        component.onPreviousSong();
        expect(playControllerService.previousSong).toHaveBeenCalled();
    });

    it('onShuffle() should call  playController.onShuffle()  ', () => {
        let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
        fixture.detectChanges();
        spyOn(playControllerService, 'onShuffle');
        component.onShuffle();
        expect(playControllerService.onShuffle).toHaveBeenCalled();
    });
    it('onRepeatSong() should call  playController.onRepeatSong()  ', () => {
        let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
        fixture.detectChanges();
        spyOn(playControllerService, 'onRepeatSong');
        component.onRepeatSong();
        expect(playControllerService.onRepeatSong).toHaveBeenCalled();
    });

    it('onChangeMusicBarValue(seekbar) should call  playController.updateMusicBarValue()  ', () => {
        let seekBar: DebugElement = fixture.debugElement.query(By.css('.seek-slider'));
        let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
        fixture.detectChanges();
        spyOn(playControllerService, 'updateMusicBarValue');
        component.onChangeMusicBarValue(seekBar.nativeNode);
        expect(playControllerService.updateMusicBarValue).toHaveBeenCalled();
    });

    it('updateVolumeValue(seekbar) should call  playController.updateVolumeValue()  ', () => {
        let volumeBar: DebugElement = fixture.debugElement.query(By.css('#volume-slider'));
        let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
        fixture.detectChanges();
        spyOn(playControllerService, 'updateVolumeValue');
        component.updateVolumeValue(volumeBar.nativeNode);
        expect(playControllerService.updateVolumeValue).toHaveBeenCalled();
    });

    it('onSongPreviewToggle() should emit  closeMobilePreview  ', () => {
        spyOn(component.closeMobilePreview, 'emit');
        component.onSongPreviewToggle();
        expect(component.closeMobilePreview.emit).toHaveBeenCalled();
    });
    it('lyricToggles() should emit  lyricToggle  ', () => {
        spyOn(component.lyricToggle, 'emit');
        component.lyricToggles();
        expect(component.lyricToggle.emit).toHaveBeenCalled();
    });

    it('variables should not be null after ngOnInit', () => {
        let status = component.status;
        let statusSub = component.statusSub;
        let repeatMode = component.repeatMode;
        let repeatModeSub = component.repeatModeSub;
        let shuffleMode = component.shuffleMode;
        let shuffleModeSub = component.shuffleModeSub;
        let seekBarValue = component.seekBarValue;
        let seekBarValueSub = component.seekBarValueSub;
        let seekBarMaxvalueSub = component.seekBarMaxvalueSub;
        let selectedSongSub = component.selectedSongSub;
        let playingSongSub = component.playingSongSub;

        component.ngOnInit();

        expect(status).not.toBeNull();
        expect(statusSub).not.toBeNull();
        expect(repeatMode).not.toBeNull();
        expect(repeatModeSub).not.toBeNull();
        expect(shuffleMode).not.toBeNull();
        expect(shuffleModeSub).not.toBeNull();
        expect(seekBarValue).not.toBeNull();
        expect(seekBarValueSub).not.toBeNull();
        expect(seekBarMaxvalueSub).not.toBeNull();
        expect(selectedSongSub).not.toBeNull();
        expect(playingSongSub).not.toBeNull();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
