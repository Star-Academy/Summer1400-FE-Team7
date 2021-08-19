import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {HostListener} from '@angular/core';
import {Subscription} from 'rxjs';
import {SongService} from 'src/app/services/song.service';

import {Song} from '../../../../models/song';

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

    loading = false;
    error = '';

    playlists = [
        'test1',
        'test2',
        'test3',
        'test4',
        'test5',
        'test3',
        'test4',
        'test5',
        'test3',
        'test4',
        'test5',
        'test3',
        'test4',
        'test5',
    ];

    constructor(private songService: SongService) {
        this.loadingSubscription = this.songService.loading.subscribe((loading: boolean) => {
            this.loading = loading;
        });

        this.errorSubscription = this.songService.error.subscribe((error: string) => {
            this.error = error;
        });
        this.completeSubscription = this.songService.complete.subscribe((complete: boolean) => {
            if (complete) {
                console.log('hererer');
                this.isCreatePlaylistPanelOpen = !this.isCreatePlaylistPanelOpen;
            }
        });
    }

    ngOnInit(): void {}

    closeNewPlaylistPanel() {
        this.closeAddToNewPlaylistPanel.emit();
    }

    createNewPlaylist() {
        this.songService.createNewPlaylist(this.playlistName);
    }

    ngOnDestroy(): void {
        this.loadingSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
        this.completeSubscription.unsubscribe();
    }

    onCancleClick() {
        this.isCreatePlaylistPanelOpen = !this.isCreatePlaylistPanelOpen;
        this.playlistName = '';
        this.songService.error.next('');
    }
}
