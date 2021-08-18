import {Component, OnInit, Input, HostListener} from '@angular/core';
import {Song} from 'src/app/models/song';
import {SongService} from 'src/app/services/song.service';
import {UiManagerService} from 'src/app/services/ui-manager.service';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss'],
})
export class SongItemComponent implements OnInit {
  @Input() song!: Song;
  @Input() index!: number;
  @Input() layout!: string;

  isMoreOptionsOpened: boolean = false;
  isAddToPlaylistPanelOpen: boolean = false;

  constructor(private uiManager: UiManagerService, private songService: SongService) {
  }

  ngOnInit(): void {
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

}
