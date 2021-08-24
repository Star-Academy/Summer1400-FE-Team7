import {TestBed} from '@angular/core/testing';

import {PlayControllerService} from './play-controller.service';
import {SongService} from './song.service';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Song} from '../models/song';

describe('PlayControllerService', () => {
    let playControllerService: PlayControllerService;
    let songService: SongService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, HttpClientTestingModule, RouterTestingModule],
        });
        playControllerService = TestBed.inject(PlayControllerService);
        songService = TestBed.inject(SongService);
        songService.selectedSong = new Song();
    });

    it('should be created', () => {
        expect(playControllerService).toBeTruthy();
        expect(songService).toBeTruthy();
    });

    it('seekBarValue setter should call seekBarValueChanged', () => {
        spyOn(playControllerService.seekBarValueChanged, 'next');
        playControllerService.seekBarValue = 100;
        expect(playControllerService.seekBarValueChanged.next).toHaveBeenCalled();
    });

    it('shuffleMode setter should call shuffleModeChanged', () => {
        spyOn(playControllerService.shuffleModeChanged, 'next');
        playControllerService.shuffleMode = true;
        expect(playControllerService.shuffleModeChanged.next).toHaveBeenCalled();
    });

    it('repeatMode setter should call repeatModeChanged', () => {
        spyOn(playControllerService.repeatModeChanged, 'next');
        playControllerService.repeatMode = playControllerService.repeatTypes.NO_REPEAT;
        expect(playControllerService.repeatModeChanged.next).toHaveBeenCalled();
    });

    it('status setter should call statusChanged', () => {
        spyOn(playControllerService.statusChanged, 'next');
        playControllerService.status = playControllerService.statusTypes.STOPPED;
        expect(playControllerService.statusChanged.next).toHaveBeenCalled();
    });
    it('loadMusic() should call generatePlayingSong if index == undefined', () => {
        let index = undefined;
        spyOn(playControllerService, 'generatePlayingSong');
        playControllerService.loadMusic(index);
        expect(playControllerService.generatePlayingSong).toHaveBeenCalled();
    });

    it('loadMusic() should not call generatePlayingSong if index != undefined', () => {
        let index = 1;
        spyOn(playControllerService, 'generatePlayingSong');
        playControllerService.currentPlaylist = [];
        playControllerService.loadMusic(index);
        expect(playControllerService.generatePlayingSong).not.toHaveBeenCalled();
    });

    it('loadMusic() should   call audio.load()', () => {
        let index = 1;
        spyOn(playControllerService.audio, 'load');
        playControllerService.currentPlaylist = [];
        playControllerService.loadMusic(index);
        expect(playControllerService.audio.load).toHaveBeenCalled();
    });

    it('generatePlayingSong() should use selectedSong file playingSong is undefined', () => {
        let song = new Song();
        songService.selectedSong = {...song, file: 'selectedSong.mp3'};
        playControllerService.generatePlayingSong();
        expect(playControllerService.audio.src).toEqual('http://localhost:9876/selectedSong.mp3');
    });

    it('generatePlayingSong() should use playingSong file playingSong is not undefined', () => {
        let song = new Song();
        songService.playingSong = {...song, file: 'playingSong.mp3'};
        playControllerService.generatePlayingSong();
        expect(playControllerService.audio.src).toEqual('http://localhost:9876/playingSong.mp3');
    });

    it('play() should make status LOADING', () => {
        playControllerService.play();
        expect(playControllerService.status).toEqual(playControllerService.statusTypes.LOADING);
    });

    it('play() should call loadMusic()', () => {
        spyOn(playControllerService, 'loadMusic');
        playControllerService.play();
        expect(playControllerService.loadMusic).toHaveBeenCalled();
    });

    it('play() should call playSongWhenPossible()', () => {
        spyOn(playControllerService, 'playSongWhenPossible');
        playControllerService.play();
        expect(playControllerService.playSongWhenPossible).toHaveBeenCalled();
    });

    it('play() should call updateSeekBarValue()', () => {
        spyOn(playControllerService, 'onAudioPlayTimeChange');
        playControllerService.play();
        expect(playControllerService.onAudioPlayTimeChange).toHaveBeenCalled();
    });

    it('play() should call onPlayEnded()', () => {
        spyOn(playControllerService, 'onPlayEnded');
        playControllerService.play();
        expect(playControllerService.onPlayEnded).toHaveBeenCalled();
    });

    it('nextActionOnPlayEnd() should call nextSong() if repeatTypes is NO_REPEAT ', async () => {
        spyOn(playControllerService, 'nextSong');
        playControllerService.repeatMode = playControllerService.repeatTypes.NO_REPEAT;
        playControllerService.nextActionOnPlayEnd();
        expect(playControllerService.nextSong).toHaveBeenCalled();
    });

    it('nextActionOnPlayEnd() should call nextSong() if repeatTypes is ALL_REPEAT ', async () => {
        spyOn(playControllerService, 'nextSong');
        playControllerService.repeatMode = playControllerService.repeatTypes.ALL_REPEAT;
        playControllerService.nextActionOnPlayEnd();
        expect(playControllerService.nextSong).toHaveBeenCalled();
    });

    it('nextActionOnPlayEnd() should call resume() if repeatTypes is ONE_REPEAT ', async () => {
        spyOn(playControllerService, 'resume');
        playControllerService.repeatMode = playControllerService.repeatTypes.ONE_REPEAT;
        playControllerService.nextActionOnPlayEnd();
        expect(playControllerService.resume).toHaveBeenCalled();
    });

    it('onAudioPlayTimeChange() should call updateSeekBarValue() ', async () => {
        spyOn(playControllerService, 'updateSeekBarValue');
        playControllerService.onAudioPlayTimeChange();
        expect(playControllerService.updateSeekBarValue).toHaveBeenCalled();
    });

    it('audioActionWhenCanPlay() should call make status PLAYING if status == LOADING ', async () => {
        playControllerService.status = playControllerService.statusTypes.LOADING;
        playControllerService.audioActionWhenCanPlay();
        expect(playControllerService.status).toEqual(playControllerService.statusTypes.PLAYING);
    });

    it('audioActionWhenCanPlay() should call audio.play() if status == LOADING ', async () => {
        spyOn(playControllerService.audio, 'play');
        playControllerService.status = playControllerService.statusTypes.LOADING;
        playControllerService.audioActionWhenCanPlay();
        expect(playControllerService.audio.play).toHaveBeenCalled();
    });

    it('audioActionWhenCanPlay() should call audio.pause() if status == PAUSED ', async () => {
        spyOn(playControllerService.audio, 'pause');
        playControllerService.status = playControllerService.statusTypes.PAUSED;
        playControllerService.audioActionWhenCanPlay();
        expect(playControllerService.audio.pause).toHaveBeenCalled();
    });

    it('stop() should call audio.pause()', async () => {
        spyOn(playControllerService.audio, 'pause');
        playControllerService.stop();
        expect(playControllerService.audio.pause).toHaveBeenCalled();
    });

    it('stop() should make status STOPPED', async () => {
        playControllerService.stop();
        expect(playControllerService.status).toEqual(playControllerService.statusTypes.STOPPED);
    });

    it('pause() should call audio.pause()', async () => {
        spyOn(playControllerService.audio, 'pause');
        playControllerService.pause();
        expect(playControllerService.audio.pause).toHaveBeenCalled();
    });

    it('pause() should make status PAUSED', async () => {
        playControllerService.pause();
        expect(playControllerService.status).toEqual(playControllerService.statusTypes.PAUSED);
    });
    it('resume() should call audio.play()', async () => {
        spyOn(playControllerService.audio, 'play');
        playControllerService.resume();
        expect(playControllerService.audio.play).toHaveBeenCalled();
    });

    it('resume() should make status PLAYING', async () => {
        playControllerService.resume();
        expect(playControllerService.status).toEqual(playControllerService.statusTypes.PLAYING);
    });

    it('nextSong() should call handleShuffleModeOnNextSong()', async () => {
        playControllerService.currentPlaylist = [];
        spyOn(playControllerService, 'handleShuffleModeOnNextSong');
        playControllerService.nextSong();
        expect(playControllerService.handleShuffleModeOnNextSong).toHaveBeenCalled();
    });

    it('nextSong() should call handleShuffleModeOnNextSong()', async () => {
        playControllerService.currentPlaylist = [];
        spyOn(playControllerService, 'handleShuffleModeOnNextSong');
        playControllerService.nextSong();
        expect(playControllerService.handleShuffleModeOnNextSong).toHaveBeenCalled();
    });
    it('nextSong() should call handleNextSong()', async () => {
        playControllerService.currentPlaylist = [];
        spyOn(playControllerService, 'handleNextSong');
        playControllerService.nextSong();
        expect(playControllerService.handleNextSong).toHaveBeenCalled();
    });

    it('handleShuffleModeOnNextSong() should increase shuffleIndex by 1 if shuffleMode on', async () => {
        playControllerService.currentPlaylist = [new Song(), new Song()];
        playControllerService.shuffleIndex = 0;
        let currentShuffleIndex = playControllerService.shuffleIndex;
        playControllerService.shuffleMode = true;
        playControllerService.handleShuffleModeOnNextSong();
        expect(playControllerService.shuffleIndex).toEqual(currentShuffleIndex + 1);
    });

    it('handleShuffleModeOnNextSong() should make shuffleIndex 0 if shuffleIndex >= currentPlaylist.length', async () => {
        playControllerService.currentPlaylist = [];
        playControllerService.shuffleIndex = 5;
        playControllerService.shuffleMode = true;
        playControllerService.handleShuffleModeOnNextSong();
        expect(playControllerService.shuffleIndex).toEqual(0);
    });

    it('handleShuffleModeOnNextSong() should increase currenSongIndex by 1 if shuffleMode off', async () => {
        playControllerService.currentPlaylist = [new Song(), new Song()];
        let currentSongIndex = songService.currenSongIndex;
        playControllerService.shuffleMode = false;
        playControllerService.handleShuffleModeOnNextSong();
        expect(songService.currenSongIndex).toEqual(currentSongIndex + 1);
    });

    it('handleNextSong() should make currenSongIndex 0 if currentSongIndex >= this.currentPlaylist.length', async () => {
        playControllerService.currentPlaylist = [];
        songService.currenSongIndex++;
        playControllerService.handleNextSong();
        expect(songService.currenSongIndex).toEqual(0);
    });

    it('handleNextSong() should call pause() if repeatTypes.NO_REPEAT && !this.shuffleMode', async () => {
        playControllerService.currentPlaylist = [];
        spyOn(playControllerService, 'pause');
        songService.currenSongIndex++;
        playControllerService.repeatMode = playControllerService.repeatTypes.NO_REPEAT;
        playControllerService.shuffleMode = false;
        playControllerService.handleNextSong();
        expect(playControllerService.pause).toHaveBeenCalled();
    });

    it('previousSong() should call handleShuffleModeOnPreviousSong()', async () => {
        playControllerService.currentPlaylist = [];
        spyOn(playControllerService, 'handleShuffleModeOnPreviousSong');
        playControllerService.previousSong();
        expect(playControllerService.handleShuffleModeOnPreviousSong).toHaveBeenCalled();
    });
    it('previousSong() should call handlePreviousSong()', async () => {
        playControllerService.currentPlaylist = [];
        spyOn(playControllerService, 'handlePreviousSong');
        playControllerService.previousSong();
        expect(playControllerService.handlePreviousSong).toHaveBeenCalled();
    });

    it('handleShuffleModeOnNextSong() should decrease shuffleIndex by 1 if shuffleMode on', async () => {
        playControllerService.currentPlaylist = [new Song(), new Song()];
        playControllerService.shuffleIndex = 2;
        let currentShuffleIndex = playControllerService.shuffleIndex;
        playControllerService.shuffleMode = true;
        playControllerService.handleShuffleModeOnPreviousSong();
        expect(playControllerService.shuffleIndex).toEqual(currentShuffleIndex - 1);
    });

    it('handlePreviousSong() should call loadMusic()', async () => {
        playControllerService.currentPlaylist = [];
        spyOn(playControllerService, 'loadMusic');
        playControllerService.handlePreviousSong();
        expect(playControllerService.loadMusic).toHaveBeenCalled();
    });

    it('onRepeatSong() should set repeatMode to ONE_REPEAT if it is NO_REPEAT ', async () => {
        playControllerService.repeatMode = playControllerService.repeatTypes.NO_REPEAT;
        playControllerService.onRepeatSong();
        expect(playControllerService.repeatMode).toEqual(playControllerService.repeatTypes.ONE_REPEAT);
    });

    it('onRepeatSong() should set repeatMode to ALL_REPEAT if it is ONE_REPEAT ', async () => {
        playControllerService.repeatMode = playControllerService.repeatTypes.ONE_REPEAT;
        playControllerService.onRepeatSong();
        expect(playControllerService.repeatMode).toEqual(playControllerService.repeatTypes.ALL_REPEAT);
    });

    it('onRepeatSong() should set repeatMode to NO_REPEAT if it is ALL_REPEAT ', async () => {
        playControllerService.repeatMode = playControllerService.repeatTypes.ALL_REPEAT;
        playControllerService.onRepeatSong();
        expect(playControllerService.repeatMode).toEqual(playControllerService.repeatTypes.NO_REPEAT);
    });

    it('onShuffle() should toggle shuffleMode ', async () => {
        playControllerService.currentPlaylist = [new Song(), new Song()];
        let shuffleMode = playControllerService.shuffleMode;
        playControllerService.onShuffle();
        let shuffleModeAfterChange = playControllerService.shuffleMode;
        expect(shuffleMode).not.toEqual(shuffleModeAfterChange);
    });
});
