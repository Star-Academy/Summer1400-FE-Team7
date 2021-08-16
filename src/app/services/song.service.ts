import {Injectable} from '@angular/core';
import {Playlist} from '../models/playlist';
import {Song} from '../models/song';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SongService {
    private _allPlaylists: Playlist[] = [];
    private _allSongs: Song[] = [
        new Song(
            1,
            'جنگه دلم',
            'شادمهر عقیلی',
            '1:30',
            'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
            false,
            'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
            'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
        ),
        new Song(
            1,
            '2جنگه دلم',
            'شادمهر عقیلی',
            '1:30',
            'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
            true,
            'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
            'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
        ),
        new Song(
            1,
            '3جنگه دلم',
            'شادمهر عقیلی',
            '1:30',
            'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
            true,
            'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
            'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
        ),
        new Song(
            1,
            '4جنگه دلم',
            'شادمهر عقیلی',
            '1:30',
            'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
            false,
            'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
            'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
        ),
    ];

    private _favouriteSongs: Song[] = [];
    private _searchSongs: Song[] = [];
    private _currentPlaylist: Song[] = [];

    allPlaylistsChanged = new Subject<Playlist[]>();
    allSongsChanged = new Subject<Song[]>();
    favouriteSongsChanged = new Subject<Song[]>();
    searchSongsChanged = new Subject<Song[]>();
    currentPlaylistChanged = new Subject<Song[]>();

    public get allPlaylists(): Playlist[] {
        return this._allPlaylists.slice();
    }
    public set allPlaylists(value: Playlist[]) {
        this._allPlaylists = value;
        this.allPlaylistsChanged.next(this._allPlaylists.slice());
    }

    public get allSongs(): Song[] {
        return this._allSongs.slice();
    }
    public set allSongs(value: Song[]) {
        this._allSongs = value;
        this.allSongsChanged.next(this._allSongs.slice());
    }

    public get searchSongs(): Song[] {
        return this._searchSongs.slice();
    }
    public set searchSongs(value: Song[]) {
        this._searchSongs = value;
        this.searchSongsChanged.next(this._searchSongs.slice());
    }

    public get favouriteSongs(): Song[] {
        return this._favouriteSongs.slice();
    }
    public set favouriteSongs(value: Song[]) {
        this._favouriteSongs = value;
        this.favouriteSongsChanged.next(this._favouriteSongs.slice());
    }

    public get currentPlaylist(): Song[] {
        return this._currentPlaylist.slice();
    }
    public set currentPlaylist(value: Song[]) {
        this._currentPlaylist = value;
        this.currentPlaylistChanged.next(this._currentPlaylist.slice());
    }

    constructor() {}
}
