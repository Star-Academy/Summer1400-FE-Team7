import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {Playlist} from '../models/playlist';
import {Song} from '../models/song';

import {SongService} from './song.service';

describe('SongService', () => {
    let songService: SongService;
    let song: Song = new Song(1, 'name', 'artist', 123, 'test', true, 'lyric', 'asd/asd', true);
    let playlist: Playlist = new Playlist('asd', 123, [song]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
        });
        songService = TestBed.inject(SongService);
    });

    it('should be created', () => {
        expect(songService).toBeTruthy();
    });

    it('playingSong setter should call playingSongChange', () => {
        spyOn(songService.playingSongChange, 'next');
        songService.playingSong = song;
        expect(songService.playingSongChange.next).toHaveBeenCalled();
    });

    it('currenSongIndex setter should call currenSongIndexChange', () => {
        spyOn(songService.currenSongIndexChange, 'next');
        songService.currenSongIndex = 123;
        expect(songService.currenSongIndexChange.next).toHaveBeenCalled();
    });

    it('currentPlaylistName setter should call currentPlaylistNameChanged', () => {
        spyOn(songService.currentPlaylistNameChanged, 'next');
        songService.currentPlaylistName = 'asd';
        expect(songService.currentPlaylistNameChanged.next).toHaveBeenCalled();
    });

    it('selectedSong setter should call selectedSongChange', () => {
        spyOn(songService.selectedSongChange, 'next');
        songService.selectedSong = song;
        expect(songService.selectedSongChange.next).toHaveBeenCalled();
    });

    it('allPlaylists setter should call allPlaylistsChanged', () => {
        spyOn(songService.allPlaylistsChanged, 'next');
        songService.allPlaylists = [playlist];
        expect(songService.allPlaylistsChanged.next).toHaveBeenCalled();
    });

    it('allSongs setter should call allSongsChanged', () => {
        spyOn(songService.allSongsChanged, 'next');
        songService.allSongs = [song];
        expect(songService.allSongsChanged.next).toHaveBeenCalled();
    });

    it('searchSongs setter should call searchSongsChanged', () => {
        spyOn(songService.searchSongsChanged, 'next');
        songService.searchSongs = [song];
        expect(songService.searchSongsChanged.next).toHaveBeenCalled();
    });

    it('favouriteSongs setter should call favouriteSongsChanged', () => {
        spyOn(songService.favouriteSongsChanged, 'next');
        songService.favouriteSongs = [song];
        expect(songService.favouriteSongsChanged.next).toHaveBeenCalled();
    });

    it('favouriteSongsIndexes setter should call favouriteSongsIndexesChanged', () => {
        spyOn(songService.favouriteSongsIndexesChanged, 'next');
        songService.favouriteSongsIndexes = [1, 2, 3];
        expect(songService.favouriteSongsIndexesChanged.next).toHaveBeenCalled();
    });

    it('currentPlaylist setter should call currentPlaylistChanged', () => {
        spyOn(songService.currentPlaylistChanged, 'next');
        songService.currentPlaylist = playlist;
        expect(songService.currentPlaylistChanged.next).toHaveBeenCalled();
    });
});
