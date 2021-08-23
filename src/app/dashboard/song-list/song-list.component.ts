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
     currentPlaylist: Song[] = [];
    currentPlaylistName: string = '';

    showPlaceholder: boolean = false;

     currentPlaylistSub!: Subscription;
    loadingSongs!: Subscription;

    layoutView: string = '';

    windowWidth!: number;
    isListEmpty: boolean = false;

    constructor(private songService: SongService) {}

    ngOnInit(): void {

        this.currentPlaylistSub = this.songService.currentPlaylistChanged.subscribe((data: Playlist) => {
            this.currentPlaylistName = data.name;
            this.currentPlaylist = data.songs;
            this.isListEmpty = data.songs.length === 0;
        });

        this.loadingSongs = this.songService.loadingSongs.subscribe((loading:boolean)=>{
           this.showPlaceholder=loading;
        });

    }

    onResize(event: any) {

        this.windowWidth = event.target.innerWidth;
        if (this.windowWidth < 750) {
            if (this.layoutView === 'list-compact-view') {
                this.changeLayoutViewHandler('list-view');
            }
        }
    }

    ngOnDestroy(): void {
      this.loadingSongs.unsubscribe();
      this.currentPlaylistSub.unsubscribe();
    }

    changeLayoutViewHandler(viewType: any) {
        this.layoutView = viewType;
    }


}
