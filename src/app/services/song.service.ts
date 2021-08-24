import {Injectable} from '@angular/core';
import {Playlist} from '../models/playlist';
import {Song} from '../models/song';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constants} from '../utils/constants';

const BASE_URL = 'https://songs.code-star.ir/';

@Injectable({
    providedIn: 'root',
})
export class SongService {
    private _allPlaylists: Playlist[] = [];
    private _allSongs: Song[] = [];
    private _favouriteSongs: Song[] = [];
    private _favouriteSongsIndexes: number[] = [];
    private _searchSongs: Song[] = [];
    private _currentPlaylist!: Playlist;
    private _currentPlaylistName: string = Constants.ALL_SONGS;
    private _currenSongIndex: number = 0;
    private _selectedSong!: Song;
    private _playingSong!: Song;

    allPlaylistsChanged = new Subject<Playlist[]>();
    allSongsChanged = new Subject<Song[]>();
    favouriteSongsChanged = new Subject<Song[]>();
    favouriteSongsIndexesChanged = new Subject<number[]>();
    searchSongsChanged = new Subject<Song[]>();
    currentPlaylistChanged = new Subject<Playlist>();
    currentPlaylistNameChanged = new Subject<string>();
    selectedSongChange = new Subject<Song>();
    playingSongChange = new Subject<Song>();
    currenSongIndexChange = new Subject<number>();

    error = new Subject<string>();
    loading = new Subject<boolean>();
    loadingSongs = new Subject<boolean>();
    complete = new Subject<boolean>();
    userToken: string | null = '';
    userFavId: string | null = '';

    constructor(private http: HttpClient) {
        this.userToken = localStorage.getItem('token');
        this.userFavId = localStorage.getItem('favId');

        this.currentPlaylistNameChanged.subscribe((name: string) => {
            this.changeCurrentPlaylist(name);
        });
    }

    public get playingSong(): Song {
        return this._playingSong;
    }

    public set playingSong(value: Song) {
        this._playingSong = value;
        this.playingSongChange.next(this._playingSong);
    }

    get currenSongIndex(): number {
        return this._currenSongIndex;
    }

    set currenSongIndex(value: number) {
        this._currenSongIndex = value;
        this.currenSongIndexChange.next(value);
    }

    get currentPlaylistName(): string {
        return this._currentPlaylistName;
    }

    set currentPlaylistName(value: string) {
        this._currentPlaylistName = value;
        this.currentPlaylistNameChanged.next(value);
    }

    public get selectedSong(): Song {
        return this._selectedSong;
    }

    public set selectedSong(value: Song) {
        this._selectedSong = value;
        this.selectedSongChange.next(this._selectedSong);
    }

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
        this.allSongsChanged.next(value);
    }

    public get searchSongs(): Song[] {
        return this._searchSongs.slice();
    }

    public set searchSongs(value: Song[]) {
        this._searchSongs = value;
        this.searchSongsChanged.next(value);
    }

    get favouriteSongs(): Song[] {
        return this._favouriteSongs;
    }

    public set favouriteSongs(value: Song[]) {
        this.favouriteSongsIndexes = [];
        let indexes: number[] = [];
        value.forEach((song) => {
            indexes.push(song.id);
        });
        this.favouriteSongsIndexes = indexes;
        this._favouriteSongs = value;
        this.favouriteSongsChanged.next(value);
    }

    get favouriteSongsIndexes(): number[] {
        return this._favouriteSongsIndexes;
    }

    set favouriteSongsIndexes(value: number[]) {
        this._favouriteSongsIndexes = value;
        this.favouriteSongsIndexesChanged.next(value);
    }

    public get currentPlaylist(): Playlist {
        return this._currentPlaylist;
    }

    public set currentPlaylist(value: Playlist) {
        let songs = value.songs;
        songs.map((song) => {
            song.isFavourite = this.favouriteSongsIndexes.includes(song.id);
            return song;
        });
        let currentPlaylist = new Playlist(value.name, value.id, songs);
        this._currentPlaylist = currentPlaylist;
        this.currentPlaylistChanged.next(currentPlaylist);
    }

    public removeSelectedAttribute(): void {
        this.currentPlaylist.songs.map((song) => {
            if (song.isSelected) {
                song.isSelected = false;
                return;
            }
        });
    }

    changeCurrentPlaylist(playlistName: string) {
        this.loadingSongs.next(true);
        let currentPlaylist;
        switch (playlistName) {
            case Constants.ALL_SONGS:
                currentPlaylist = this.allSongs;
                if (currentPlaylist.length === 0) this.fetchSongs();
                else this.currentPlaylist = new Playlist(playlistName, -1, currentPlaylist);
                this.loadingSongs.next(false);
                break;
            case Constants.SEARCH_SONGS:
                this.currentPlaylist = new Playlist(playlistName, -2, this.searchSongs);
                this.loadingSongs.next(false);
                break;
            default:
                currentPlaylist = this.allPlaylists.filter((playlist) => playlist.name === playlistName)[0];
                if (currentPlaylist !== undefined) {
                    this.getOnePlaylist(currentPlaylist.id, playlistName);
                }
                this.loadingSongs.next(false);
                break;
        }
    }

    getOnePlaylist(playlistId: number, playlistName: string) {
        this.sendRequest('playlist/one' + '/' + playlistId).subscribe((data: {name: string; songs: Song[]}) => {
            let songs: Song[] = [];
            data.songs.forEach((song) => {
                songs.push(
                    new Song(
                        song.id,
                        song.name,
                        song.artist,
                        Math.random() * (400 - 180) + 180,
                        song.cover,
                        false,
                        song.lyrics,
                        song.file,
                        false
                    )
                );
            });
            if (playlistName === Constants.FAVOURITE_SONGS) {
                this.favouriteSongs = songs;
                if (songs.length === 0) {
                    songs = this.favouriteSongs;
                }
            }

            this.currentPlaylist = new Playlist(playlistName, playlistId, songs);
            this.allPlaylists.filter((playlist) => playlist.name === playlistName)[0].songs = songs;
        });
    }

    public fetchSongs(): void {
        this.loadingSongs.next(true);
        const body = {
            size: 25,
            current: 1,
            sorter: 'name',
            desc: false,
        };
        this.sendRequest('song/page', body).subscribe((data) => {
            this.allSongs = data['songs'].map((song: any) => {
                return new Song(
                    song.id,
                    song.name,
                    song.artist,
                    Math.random() * (400 - 180) + 180,
                    song.cover,
                    false,
                    song.lyrics,
                    song.file,
                    false
                );
            });
            if (this.currentPlaylistName === Constants.ALL_SONGS) {
                this.changeCurrentPlaylist(Constants.ALL_SONGS);
                this.selectedSong = this.currentPlaylist.songs[0];
            }
            this.loadingSongs.next(false);
        });
    }

    public fetchPlaylist(): void {
        const body = {
            token: this.userToken,
        };
        this.sendRequest('playlist/all', body).subscribe((data: Playlist[]) => {
            let playlists: Playlist[] = [];
            data.forEach((playlist) => {
                playlists.push(new Playlist(playlist.name, playlist.id, playlist.songs));
                if (playlist.name === 'مورد علاقه') {
                    localStorage.setItem('favId', String(playlist.id));
                    this.favouriteSongs = playlist.songs;
                }
            });
            this.allPlaylists = playlists;
            if (this.currentPlaylistName === Constants.ALL_SONGS) {
                this.fetchSongs();
            } else {
                this.changeCurrentPlaylist(this.currentPlaylistName);
            }
        });
    }

    public createNewPlaylist(name: string): void {
        let nameIsExist: boolean = false;

        for (let playlist of this.allPlaylists) {
            if (name === playlist.name) {
                nameIsExist = true;
                break;
            }
        }

        if (!nameIsExist) {
            const body = {
                token: this.userToken,
                name,
            };
            this.sendRequest('playlist/create', body).subscribe((data: {id: number}) => {
                let playlists: Playlist[] = this.allPlaylists;
                playlists.push(new Playlist(name, data.id, []));
                this.allPlaylists = playlists;
                this.complete.next(true);
            });
        } else {
            this.error.next('این نام قبلا استفاده شده است');
        }
    }

    removePlaylist(playlistId: number) {
        const body = {
            token: this.userToken,
            id: playlistId,
        };
        this.sendRequest('playlist/remove', body).subscribe(() => {
            this.allPlaylists = this.allPlaylists.filter((playlist: Playlist) => {
                return playlist.id !== playlistId;
            });
        });
    }

    addToPlaylist(playlistId: number, song: Song) {
        const body = {
            token: this.userToken,
            playlistId,
            songId: song.id,
        };
        this.sendRequest('playlist/add-song', body).subscribe(() => {
            let playlistTemp: Playlist = this.allPlaylists.filter(
                (playlist: Playlist) => playlist.id === playlistId
            )[0];
            playlistTemp.songs.push(song);
            if (playlistId === this.currentPlaylist.id) this.currentPlaylist = playlistTemp;
        });
    }

    removeFromPlaylist(playlistId: number, songId: number) {
        const body = {token: this.userToken, playlistId: playlistId, songId};

        this.sendRequest('playlist/remove-song', body).subscribe(() => {
            let playlistTemp: Playlist = this.allPlaylists.filter(
                (playlist: Playlist) => playlist.id === playlistId
            )[0];
            playlistTemp.songs = playlistTemp.songs.filter((song) => song.id !== songId);

            if (playlistId === this.currentPlaylist.id) this.currentPlaylist = playlistTemp;

            this.allPlaylists = this.allPlaylists.map((playlist: Playlist) => {
                if (playlist.id === playlistId) return playlistTemp;
                else return playlist;
            });
        });
    }

    addToFavorites(songId: number) {
        const body = {
            token: this.userToken,
            playlistId: this.userFavId,
            songId,
        };
        this.sendRequest('playlist/add-song', body).subscribe(() => {
            let indexes: number[] = this.favouriteSongsIndexes;
            indexes.push(songId);
            this.favouriteSongsIndexes = indexes;
        });
    }

    removeFromFavorites(songId: number) {
        const body = {
            token: this.userToken,
            playlistId: this.userFavId,
            songId,
        };
        this.sendRequest('playlist/remove-song', body).subscribe(() => {
            let indexes: number[] = this.favouriteSongsIndexes;
            let songIndex = indexes.indexOf(songId);
            indexes.splice(songIndex, 1);
            this.favouriteSongsIndexes = indexes;
        });
    }

    searchSongsByName(phrase: string) {
        const body = {
            phrase: phrase,
            count: 20,
            sorter: 'name',
            desc: true,
        };
        if (phrase !== '') {
            this.sendRequest('song/find', body).subscribe((data: any) => {
                this.searchSongs = data['songs'].map((song: any) => {
                    return new Song(
                        song.id,
                        song.name,
                        song.artist,
                        Math.random() * (400 - 180) + 180,
                        song.cover,
                        false,
                        song.lyrics,
                        song.file,
                        false
                    );
                });
                this.changeCurrentPlaylist(Constants.SEARCH_SONGS);
            });
        } else {
            this.changeCurrentPlaylist(this.currentPlaylistName);
        }
    }

    private sendRequest(url: string, body?: object): Observable<any> {
        this.loading.next(true);
        return new Observable((observer) =>
            this.http
                .request<any>(body ? 'POST' : 'GET', `${BASE_URL}${url}`, {
                    body: body,
                    headers: new HttpHeaders({
                        'Cache-Control': `no-cache`,
                        Pragma: 'no-cache',
                    }),
                    observe: 'body',
                })
                .subscribe(
                    (responseData) => {
                        this.loading.next(false);
                        this.error.next('');
                        observer.next(responseData);
                    },
                    (error) => {
                        this.loading.next(false);
                        this.error.next(error.error.message);
                    },
                    () => {
                        this.loading.next(false);
                        this.complete.next(true);
                        this.error.next('');
                    }
                )
        );
    }
}
