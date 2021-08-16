import {Injectable} from '@angular/core';
import {Playlist} from '../models/playlist';
import {Song} from '../models/song';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";

const BASE_URL = 'https://songs.code-star.ir/';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private _allPlaylists: Playlist[] = [];
  private _allSongs: Song[] = [];
  private _favouriteSongs: Song[] = [];
  private _searchSongs: Song[] = [];
  private _currentPlaylist: { name: string, songs: Song[] } = {name: "", songs: []};
  currenSongIndex: number = 0;
  private _selectedSong!: Song
  private _playingSong!: Song

  allPlaylistsChanged = new Subject<Playlist[]>();
  allSongsChanged = new Subject<Song[]>();
  favouriteSongsChanged = new Subject<Song[]>();
  searchSongsChanged = new Subject<Song[]>();
  currentPlaylistChanged = new Subject<{ name: string, songs: Song[] }>();
  selectedSongChange = new Subject<Song>();
  playingSongChange = new Subject<Song>();

  error = new Subject<string>();
  loading = new Subject<boolean>();
  complete = new Subject<boolean>();

  public get playingSong(): Song {
    return this._playingSong;
  }

  public set playingSong(value: Song) {
    this._playingSong = value;
    this.playingSongChange.next(this._playingSong);
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
    this._favouriteSongs = value;
    this.favouriteSongsChanged.next(value);
  }

  public get currentPlaylist(): { name: string, songs: Song[] } {
    return this._currentPlaylist;
  }

  public set currentPlaylist(value: { name: string, songs: Song[] }) {
    this._currentPlaylist = value;
    this.currentPlaylistChanged.next(value);
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
      this.playingSong = this.currentPlaylist.songs[0]
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
        },
        (error) => {
          this.loading.next(false);
          this.error.next(error.error.message);
          this.complete.next(false);

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
