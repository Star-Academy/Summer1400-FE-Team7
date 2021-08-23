import {Component, HostListener, OnInit} from '@angular/core';
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
    // allSongs: Song[] = [];
    currentPlaylist: Song[] = [];
    currentPlaylistName: string = '';

    showPlaceholder: boolean = false;

    // allSongsSub!: Subscription;
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

        this.loadingSongs = this.songService.loadingSongs.subscribe((loading: boolean) => {
            this.showPlaceholder = loading;
        });
        // this.allSongsSub = this.songService.allSongsChanged.subscribe((data: Song[]) => {
        //     this.allSongs = data;
        // });
        // this.allSongs = this.songService.allSongs;
    }

    onResize(event: any) {
        //TODO
        this.windowWidth = event.target.innerWidth;
        if (this.windowWidth < 750) {
            if (this.layoutView === 'list-compact-view') {
                this.changeLayoutViewHandler('list-view');
            }
        }
    }

    ngOnDestroy(): void {
        // this.allSongsSub.unsubscribe();
        this.loadingSongs.unsubscribe();
        this.currentPlaylistSub.unsubscribe();
    }

    changeLayoutViewHandler(viewType: any) {
        this.layoutView = viewType;
    }

    onScroll() {
        let pos =
            (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        let max = document.documentElement.scrollHeight;
        console.log(document.body.offsetHeight);
        // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
        if (pos == max) {
            //Do your action here
            console.log('aaaaaaaaaa');
        }
    }
}
