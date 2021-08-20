import {Component, OnInit, Input, HostListener} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import {Song} from 'src/app/models/song';
import {SongService} from 'src/app/services/song.service';
import {NotificationService} from 'src/app/services/notification.service';
import { Constants } from 'src/app/utils/constants';
import {Playlist} from "../../../models/playlist";

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({  opacity: 0, transform: 'scale(0.8)'}),
            animate('0.3s ease-out',
              style({  opacity: 1 , transform: 'scale(1)'}))
          ]
        ),
        transition(
          ':leave',
          [
            style({  opacity: 1,transform: 'scale(1)' }),
            animate('0.1s ease-in',
              style({  opacity: 0 , transform: 'scale(0.8)'}))
          ]
        )
      ]
    )
  ]
})
export class SongItemComponent implements OnInit {
  @Input() song!: Song;
  @Input() index!: number;
  @Input() layout!: string;

  canDelete: boolean = false;
  currentPlaylist!:Playlist;

  isMoreOptionsOpened: boolean = false;
  isAddToPlaylistPanelOpen: boolean = false;

  constructor(private uiManager: NotificationService, private songService: SongService) {
  }

  ngOnInit(): void {
    this.currentPlaylist=this.songService.currentPlaylist;
    if(this.currentPlaylist.name!==Constants.ALL_SONGS &&
      this.currentPlaylist.name!==Constants.FAVOURITE_SONGS ){
      this.canDelete=true;
      }
   }

  openNewPlaylistPanel() {
    this.toggleNewPlaylistPanel()
    this.isMoreOptionsOpened = false;
  }

  onSingleClick() {
    this.songService.removeSelectedAttribute();
    this.song.isSelected = true;
    this.songService.selectedSong = this.song;
  }

  onDoubleClick() {
    this.songService.playingSong = this.song;
    this.songService.currenSongIndex=this.index;
  }

  onFavoriteClick() {
    this.song.isFavourite = !this.song.isFavourite;
    if (this.song.isFavourite) {
      this.songService.addToFavorites(this.song.id);
    } else {
      this.songService.removeFromFavorites(this.song.id);
    }
  }

  toggleNewPlaylistPanel() {
    this.isAddToPlaylistPanelOpen=!this.isAddToPlaylistPanelOpen;
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key==="Escape")
    if (this.isAddToPlaylistPanelOpen){
      this.isAddToPlaylistPanelOpen=false
    }


  }

  onDeletePlaylist() {
    this.songService.removeFromPlaylist(this.currentPlaylist.id,this.song.id)
    this.isMoreOptionsOpened=false;
    this.uiManager.showNotification("حذف شد",false,()=>{
      this.songService.addToPlaylist(this.currentPlaylist.id,this.song)
    })
  }
}
