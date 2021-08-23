import {Component, OnInit, Input, HostListener, Output, EventEmitter} from '@angular/core';
import {PlaylistItem} from 'src/app/models/playlistItem';
import {SongService} from '../../../services/song.service';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
    @Input() playlistItem!: PlaylistItem;
    @Output() openAddNewPlaylistPanel = new EventEmitter<void>();
    buttonType!: string;

    constructor(private songService: SongService) {}

    ngOnInit(): void {
        this.buttonType = this.playlistItem.buttonType;
    }

    openNewPlaylistPanel() {
        this.openAddNewPlaylistPanel.emit();
    }

    onRemove() {
        this.songService.removePlaylist(this.playlistItem.id);
    }
}
