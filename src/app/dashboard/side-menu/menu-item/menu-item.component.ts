import {Component, OnInit, Input} from '@angular/core';
import {PlaylistItem} from 'src/app/models/playlistItem';
import {UiManagerService} from 'src/app/services/ui-manager.service';
import {SongService} from "../../../services/song.service";

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
    @Input() playlistItem!: PlaylistItem;

    constructor(private uiManager: UiManagerService,private songService:SongService) {}

    ngOnInit(): void {}

    openNewPlaylistPanel() {
        this.uiManager.openCreatePlaylistPanel();

    }

  onRemove() {
    this.songService.removePlaylist(this.playlistItem.id);
  }
}
