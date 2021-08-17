import {Component, OnInit, Input} from '@angular/core';
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
    @Input() layout!: string;

    isMoreOptionsOpened: boolean = false;

    constructor(private uiManager: UiManagerService, private songService: SongService) {}

    ngOnInit(): void {
        // console.log(this.layout);
    }

    openNewPlaylistPanel() {
        this.uiManager.openAddtoNewPlaylistPanel();
        this.isMoreOptionsOpened = false;
    }

    onSingleClick() {
        this.songService.removeSelectedAttribute();
        this.song.isSelected = true;
        this.songService.selectedSong=this.song;
    }

  onDoubleClick(){
    this.songService.playingSong=this.song;

  }
}
