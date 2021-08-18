import {Injectable} from '@angular/core';
import {Playlist} from '../models/playlist';
import {Song} from '../models/song';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Constants} from "../utils/constants";

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
  private _currentPlaylist: { name: string, songs: Song[] } = {name: "", songs: []};
  private _currenSongIndex: number = 0;
  private _selectedSong!: Song
  private _playingSong!: Song

  allPlaylistsChanged = new Subject<Playlist[]>();
  allSongsChanged = new Subject<Song[]>();
  favouriteSongsChanged = new Subject<Song[]>();
  favouriteSongsIndexesChanged = new Subject<number[]>();
  searchSongsChanged = new Subject<Song[]>();
  currentPlaylistChanged = new Subject<{ name: string, songs: Song[] }>();
  selectedSongChange = new Subject<Song>();
  playingSongChange = new Subject<Song>();
  currenSongIndexChange = new Subject<number>();

  error = new Subject<string>();
  loading = new Subject<boolean>();
  complete = new Subject<boolean>();
  userToken: string | null = "";
  userFavId: string | null = "";


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

  public get favouriteSongs(): Song[] {
    return this._favouriteSongs.slice();
  }

  public set favouriteSongs(value: Song[]) {
    this.favouriteSongsIndexes = [];
    let indexes: number[] = [];
    value.forEach(song => {
      indexes.push(song.id)
    })
    this.favouriteSongsIndexes = indexes;
    this._favouriteSongs = value;
    this.favouriteSongsChanged.next(value);
  }

  get favouriteSongsIndexes(): number[] {
    return this._favouriteSongsIndexes;
  }

  set favouriteSongsIndexes(value: number[]) {
    this._favouriteSongsIndexes = value;
    this.favouriteSongsIndexesChanged.next(value)
  }

  public get currentPlaylist(): { name: string, songs: Song[] } {
    return this._currentPlaylist;
  }

  public set currentPlaylist(value: { name: string, songs: Song[] }) {
    let songs = value.songs;
    songs.map(song => {
      if (this.favouriteSongsIndexes.includes(song.id)) {
        song.isFavourite = true
      }
      return song
    })
    this._currentPlaylist = {name: value.name, songs};
    this.currentPlaylistChanged.next({name: value.name, songs});
  }

  public removeSelectedAttribute(): void {
    this.currentPlaylist.songs.map((song) => {
      if (song.isSelected) {
        song.isSelected = false;
        return;
      }
    });
  }

  constructor(private http: HttpClient) {
    this.userToken = localStorage.getItem("token");
    this.userFavId = localStorage.getItem("favId");
  }

  changeCurrentPlaylist(playlistName: string) {
    let currentPlaylist;
    if (playlistName !== Constants.ALL_SONGS) {
      currentPlaylist = this.allPlaylists.filter(playlist =>
        playlist.name === playlistName
      )[0]
      if (currentPlaylist !== undefined) {
        // this.currentPlaylist = {name: playlistName, songs: currentPlaylist.songs}
        this.getOnePlaylist(currentPlaylist.id, playlistName)

      }
    } else {
      currentPlaylist = this.allSongs
      this.currentPlaylist = {name: playlistName, songs: currentPlaylist}
    }
    //console.log(currentPlaylist);

    // this.getOnePlaylist(2)

  }

  getOnePlaylist(playlistId: number, playlistName: string) {
    this.sendRequest("playlist/one" + "/" + playlistId)
      .subscribe((data: { name: string, songs: Song[] }) => {
        console.log(data.songs);
        let songs: Song[] = [];
        data.songs.forEach(song => {
          songs.push(new Song(song.id, song.name, song.artist, "0:0", song.cover,
            false, song.lyrics, song.file, false))
        })
        this.currentPlaylist = {name: playlistName, songs: songs}
      })
  }


  public fetchSongs(): void {
    const body = {
      size: 50,
      current: 1,
      sorter: "name",
      desc: false,
    }
    this.sendRequest("song/page", body).subscribe((data) => {
      // console.log(data["songs"]);
      this.allSongs = data["songs"].map((song: any) => {
        return new Song(song.id, song.name, song.artist, "0:0", song.cover, false, song.lyrics,
          song.file, false)
      });
      this.currentPlaylist = {name: "همه آهنگ ها", songs: this.allSongs}
      this.selectedSong = this.currentPlaylist.songs[0]
      //this.playingSong = this.currentPlaylist.songs[0]
    })
  }


  public fetchPlaylist(): void {
    const body = {
      token: this.userToken,
    }
    this.sendRequest("playlist/all", body).subscribe((data: Playlist[]) => {
      let playlists: Playlist[] = [];
      data.forEach((playlist, index) => {
        playlists.push(new Playlist(playlist.name, playlist.id, playlist.songs))
        if (playlist.name === "مورد علاقه") {
          localStorage.setItem("favId", String(playlist.id));
          this.favouriteSongs = playlist.songs;
        }
      })
      this.allPlaylists = playlists
      // console.log(playlists);

    })
  }

  public createNewPlaylist(name: string): void {
    let nameIsExist: boolean = false

    for (let playlist of this.allPlaylists) {
      if (name === playlist.name) {
        nameIsExist = true;
        break;
      }
    }

    if (!nameIsExist) {
      const body = {
        token: this.userToken,
        name
      }
      this.sendRequest("playlist/create", body).subscribe((data: { id: number }) => {
        let playlists: Playlist[] = this.allPlaylists;
        playlists.push(new Playlist(name, data.id, []))
        this.allPlaylists = playlists;
        this.complete.next(true);
      })
    } else {
      this.error.next("این نام قبلا استفاده شده است")

    }

  }

  removePlaylist(id: number) {
    const body = {
      token: this.userToken,
      id: id,
    };

  }

  addToPlaylist(playlistId: number[], songId: number) {
    playlistId.forEach(playlistId => {
      const body = {
        token: this.userToken,
        playlistId,
        songId,
      };
      this.sendRequest("playlist/add-song", body).subscribe((data: any) => {
        console.log(data);
      })
    })
  }

  addToFavorites(songId: number) {
    console.log(this.userFavId);
    const body = {
      token: this.userToken,
      playlistId: this.userFavId,
      songId,
    };
    this.sendRequest("playlist/add-song", body).subscribe((data: any) => {
      console.log(data);

    })
  }

  removeFromFavorites(songId: number) {
    const body = {
      token: this.userToken,
      playlistId: this.userFavId,
      songId,
    };
    this.sendRequest("playlist/remove-song", body).subscribe((data: any) => {
      console.log(data);

    })
  }


  private sendRequest(url: string, body?: object): Observable<any> {

    this.loading.next(true);
    return new Observable((observer) => this.http
      .request<any>(body ? "POST" : "GET", `${BASE_URL}${url}`, {
        body: body,
        observe: 'body',
      })
      .subscribe(
        (responseData) => {
          this.loading.next(false);
          this.error.next('');
          observer.next(responseData)
         // console.log(responseData);
        },
        (error) => {
          this.loading.next(false);
          this.error.next(error.error.message);

          console.log(error.error.message);

        },
        () => {
          this.loading.next(false);
          this.complete.next(true);
          this.error.next("");
        }
      ))


  }


}

//   [
//     new Song(
//         1,
//         'جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '2جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         true,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '3جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         true,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
//     new Song(
//         1,
//         '4جنگه دلم',
//         'شادمهر عقیلی',
//         '1:30',
//         'https://assets.rjassets.com/static/mp3/shadmehr-aghili-jange-delam/507fffa95687e04.jpg',
//         false,
//         'ازم نخواه بشینم زیر پایِ دلم\r\nکه قولشو بزاره زیر پاش من\r\nمثل همون تب روزای اول\r\nهنوز از دیدن چشم تو داغم\r\nتا زیر سایَته آسمون بارونم\r\nوصله به حالت خاص چشات\r\nهر کی بخواد تورو ببینه قبلش\r\nباید این دیوونه ی مستو بخواد\r\n\r\nسر تو با همه ',
//         'https://host2.rj-mw1.com/media/mp3/mp3-256/Shadmehr-Aghili-Jange-Delam.mp3'
//     ),
// ];
