import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Song} from 'src/app/models/song';
import {SongService} from 'src/app/services/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  // allSongs: Song[] = [];
  currentPlaylist: Song[] = [];
  currentPlaylistName: string="";

  // allSongsSub!: Subscription;
  currentPlaylistSub!: Subscription;

  layoutView: string = '';

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.currentPlaylistSub = this.songService.currentPlaylistChanged.subscribe((data:{name:string,songs:Song[]}) => {
      this.currentPlaylistName = data.name;
      this.currentPlaylist = data.songs;
    });

    // this.allSongsSub = this.songService.allSongsChanged.subscribe((data: Song[]) => {
    //     this.allSongs = data;
    // });
    // this.allSongs = this.songService.allSongs;
  }

  ngOnDestroy(): void {
    // this.allSongsSub.unsubscribe();
    this.currentPlaylistSub.unsubscribe();
  }

  changeLayoutViewHandler(viewType: any) {
    this.layoutView = viewType;
  }
}
