import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Song} from 'src/app/models/song';
import {SongService} from 'src/app/services/song.service';
import {Playlist} from '../../models/playlist';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class SongListComponent implements OnInit {
  // allSongs: Song[] = [];
  currentPlaylist: Song[] = [];
  currentPlaylistName: string = '';

  // allSongsSub!: Subscription;
  currentPlaylistSub!: Subscription;

  layoutView: string = '';

  windowWidth!: number;
  isListEmpty: boolean = false;

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.currentPlaylistSub = this.songService.currentPlaylistChanged.subscribe((data: Playlist) => {
      this.currentPlaylistName = data.name;
      this.currentPlaylist = data.songs;
      this.isListEmpty = data.songs.length === 0;
    });

    // this.allSongsSub = this.songService.allSongsChanged.subscribe((data: Song[]) => {
    //     this.allSongs = data;
    // });
    // this.allSongs = this.songService.allSongs;
  }

  onResize(event: any) {
    //TODO
    this.windowWidth = event.target.innerWidth;
    if (this.windowWidth < 750) {
      if (this.layoutView === 'list-compact-view') {
        this.changeLayoutViewHandler('list-view');
      }
    }
  }

  ngOnDestroy(): void {
    // this.allSongsSub.unsubscribe();
    this.currentPlaylistSub.unsubscribe();
  }

  changeLayoutViewHandler(viewType: any) {
    this.layoutView = viewType;
  }
}
