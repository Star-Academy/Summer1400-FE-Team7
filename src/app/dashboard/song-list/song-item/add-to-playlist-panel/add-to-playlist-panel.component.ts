import {Component, Input, OnInit, Output, EventEmitter,  } from '@angular/core';


 import {Subscription} from 'rxjs';
import {SongService} from 'src/app/services/song.service';

import {Song} from '../../../../models/song';
import {Playlist} from "../../../../models/playlist";
import {Constants} from "../../../../utils/constants";
import {PlaylistSmall} from "../../../../models/playlistSmall";

@Component({
  selector: 'app-add-to-playlist-panel',
  templateUrl: './add-to-playlist-panel.component.html',
  styleUrls: ['./add-to-playlist-panel.component.scss'],
})
export class AddToPlaylistPanelComponent implements OnInit {
  @Input() song!: Song;
  @Output() closeAddToNewPlaylistPanel = new EventEmitter<void>();

  isCreatePlaylistPanelOpen: boolean = false;
  playlistName!: string;

  loadingSubscription: Subscription = new Subscription();
  errorSubscription: Subscription = new Subscription();
  completeSubscription: Subscription = new Subscription();

  allPlaylistsSubscription: Subscription = new Subscription();

  loading = false;
  error = '';

  playlists !: PlaylistSmall[];

  constructor(private songService: SongService) {
    this.loadingSubscription = songService.loading.subscribe((loading: boolean) => {
      this.loading = loading;
    });

    this.errorSubscription = songService.error.subscribe((error: string) => {
      this.error = error;
    });
    this.completeSubscription = songService.complete.subscribe((complete: boolean) => {
      if (complete) {
         this.isCreatePlaylistPanelOpen = false;
        this.playlistName = '';
        this.songService.error.next('');
      }
    });
  }



  ngOnInit(): void {
     this.playlists = this.songService.allPlaylists.map((playlist: Playlist) => {
      let checked =false;
       for (let song of playlist.songs){
        if (song.id === this.song.id)
          checked=true;
      }
      return new PlaylistSmall(playlist.id, playlist.name, checked)
    }).filter((playlist: PlaylistSmall) =>playlist.name !==Constants.FAVOURITE_SONGS && playlist.name!== this.songService.currentPlaylistName);

    this.allPlaylistsSubscription = this.songService.allPlaylistsChanged
      .subscribe((allPlaylists: Playlist[]) => {
        this.playlists = allPlaylists.map((playlist: Playlist) => {
          let checked =false;
          for (let song of playlist.songs){
            if (song.id === this.song.id)
              checked=true;
          }
          return new PlaylistSmall(playlist.id, playlist.name, checked)
        }).filter((playlist: PlaylistSmall) =>playlist.name !==Constants.FAVOURITE_SONGS && playlist.name!== this.songService.currentPlaylistName  );


      })

   }


  closeNewPlaylistPanel() {
    this.closeAddToNewPlaylistPanel.emit();
  }

  createNewPlaylist() {
    this.songService.createNewPlaylist(this.playlistName);
  }


  onCancelClick() {
    this.isCreatePlaylistPanelOpen = false;
    this.playlistName = '';
    this.songService.error.next('');
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.completeSubscription.unsubscribe();
    this.allPlaylistsSubscription.unsubscribe();
  }

  onCheckChanged(playlist: PlaylistSmall, event: any) {
     if (event.target.checked){
      this.songService.addToPlaylist(playlist.id,this.song)
    }else{
      this.songService.removeFromPlaylist(playlist.id,this.song.id)

    }
  }
}
