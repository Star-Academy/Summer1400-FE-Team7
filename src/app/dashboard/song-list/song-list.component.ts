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
    allSongs: Song[] = [];

    allSongsSub!: Subscription;

    layoutView: string = '';

    constructor(private songService: SongService) {}

    ngOnInit(): void {
        this.allSongsSub = this.songService.allSongsChanged.subscribe((data: Song[]) => {
            this.allSongs = data;
        });
        this.allSongs = this.songService.allSongs;
    }

    ngOnDestroy(): void {
        this.allSongsSub.unsubscribe();
    }

    changeLayoutViewHandler(viewType: any) {
        this.layoutView = viewType;
    }
}
