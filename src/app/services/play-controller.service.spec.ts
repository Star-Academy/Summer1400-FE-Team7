import {TestBed} from '@angular/core/testing';

import {PlayControllerService} from './play-controller.service';
import {SongService} from './song.service';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Song} from "../models/song";

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
        spyOn(playControllerService.seekBarValueChanged, "next");
        playControllerService.seekBarValue = 100;
        expect(playControllerService.seekBarValueChanged.next).toHaveBeenCalled()
    });

    it('shuffleMode setter should call shuffleModeChanged', () => {
        spyOn(playControllerService.shuffleModeChanged, "next");
        playControllerService.shuffleMode = true;
        expect(playControllerService.shuffleModeChanged.next).toHaveBeenCalled()
    });

    it('repeatMode setter should call repeatModeChanged', () => {
        spyOn(playControllerService.repeatModeChanged, "next");
        playControllerService.repeatMode = playControllerService.repeatTypes.NO_REPEAT;
        expect(playControllerService.repeatModeChanged.next).toHaveBeenCalled()
    });

    it('status setter should call statusChanged', () => {
        spyOn(playControllerService.statusChanged, "next");
        playControllerService.status = playControllerService.statusTypes.STOPPED;
        expect(playControllerService.statusChanged.next).toHaveBeenCalled()
    });
    it('loadMusic() should call generatePlayingSong if index == undefined', () => {
        let index = undefined;
        spyOn(playControllerService, "generatePlayingSong");
        playControllerService.loadMusic(index);
        expect(playControllerService.generatePlayingSong).toHaveBeenCalled()
    });

    it('loadMusic() should not call generatePlayingSong if index != undefined', () => {
        let index = 1;
        spyOn(playControllerService, "generatePlayingSong");
        playControllerService.currentPlaylist = []
        playControllerService.loadMusic(index);
        expect(playControllerService.generatePlayingSong).not.toHaveBeenCalled()
    });

    it('loadMusic() should   call audio.load()', () => {
        let index = 1;
        spyOn(playControllerService.audio, "load");
        playControllerService.currentPlaylist = [];
        playControllerService.loadMusic(index);
        expect(playControllerService.audio.load).toHaveBeenCalled();
    });

    it('generatePlayingSong() should use selectedSong file playingSong is undefined', () => {
        let song = new Song()
        songService.selectedSong = {...song, file: "selectedSong.mp3"}
         playControllerService.generatePlayingSong();
        expect(playControllerService.audio.src).toEqual("http://localhost:9876/selectedSong.mp3");
    });

    it('generatePlayingSong() should use playingSong file playingSong is not undefined', () => {
        let song = new Song()
        songService.playingSong = {...song, file: "playingSong.mp3"}
        playControllerService.generatePlayingSong();
        expect(playControllerService.audio.src).toEqual("http://localhost:9876/playingSong.mp3");
    });

    it('play() should make status LOADING', () => {
        playControllerService.play();
        expect(playControllerService.status).toEqual(playControllerService.statusTypes.LOADING);
    });

    it('play() should call loadMusic()', () => {
        spyOn(playControllerService,"loadMusic")
        playControllerService.play();
        expect(playControllerService.loadMusic).toHaveBeenCalled();
    });

    it('play() should call playSongWhenPossible()', () => {
        spyOn(playControllerService,"playSongWhenPossible")
        playControllerService.play();
        expect(playControllerService.playSongWhenPossible).toHaveBeenCalled();
    });

    it('play() should call updateSeekBarValue()', () => {
        spyOn(playControllerService,"updateSeekBarValue")
        playControllerService.play();
        expect(playControllerService.updateSeekBarValue).toHaveBeenCalled();
    });

    it('play() should call onPlayEnded()', () => {
        spyOn(playControllerService,"onPlayEnded")
        playControllerService.play();
        expect(playControllerService.onPlayEnded).toHaveBeenCalled();
    });

    // it('onPlayEnded() should call nextSong() if repeatTypes is NO_REPEAT ', async() => {
    //     spyOn(playControllerService,"nextSong");
    //     playControllerService.repeatMode = playControllerService.repeatTypes.NO_REPEAT
    //     playControllerService.onPlayEnded();
    //     expect(playControllerService.nextSong).toHaveBeenCalled();
    // });





});
