import {Component, OnInit, Input, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {PlaylistItem} from 'src/app/models/playlistItem';
import {SongService} from '../../../services/song.service';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
    @Input() playlistItem!: PlaylistItem;

    isPanelOpen: boolean = false;

    constructor(private songService: SongService, private router: Router) {}

    ngOnInit(): void {}

    openNewPlaylistPanel() {
        this.isPanelOpen = true;
    }

    onRemove() {
        this.songService.removePlaylist(this.playlistItem.id);
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Escape')
            if (this.isPanelOpen) {
                this.isPanelOpen = false;
            }
    }
    // onPlaylistItemClick() {
    //   console.log(this.playlistItem.name);
    //   this.router.navigate(["/dashboard"],
    //     {queryParams:{playlist:this.playlistItem.name}})
    // }
    closePanel() {
        this.isPanelOpen = false;
    }

    // onMouseout() {
    //     this.showRemoveIcon = false;
    // }

    // onMouseover() {
    //     this.showRemoveIcon = true;
    // }
}
