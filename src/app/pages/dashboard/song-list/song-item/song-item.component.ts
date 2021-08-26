import {Component, OnInit, Input, HostListener, OnDestroy} from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';

import {Song} from 'src/app/models/song';
import {SongService} from 'src/app/services/song.service';
import {NotificationService} from 'src/app/services/notification.service';
import {Constants} from 'src/app/utils/constants';
import {Playlist} from '../../../../models/playlist';
import {PlayControllerService} from 'src/app/services/play-controller.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-song-item',
    templateUrl: './song-item.component.html',
    styleUrls: ['./song-item.component.scss'],
    animations: [
        trigger('inOutAnimation', [
            transition(':enter', [
                style({opacity: 0, transformOrigin: 'center'}),
                animate('0.3s ease-out', style({opacity: 1, transformOrigin: 'center'})),
            ]),
            transition(':leave', [
                style({opacity: 1, transformOrigin: 'center'}),
                animate('0.1s ease-in', style({opacity: 0, transformOrigin: 'center'})),
            ]),
        ]),
    ],
})
export class SongItemComponent implements OnInit, OnDestroy {
    readonly statusTypes = {
        PLAYING: 'playing',
        PAUSED: 'paused',
        STOPPED: 'stopped',
        LOADING: 'loading',
        MUTED: 'muted',
    };

    @Input() song!: Song;
    @Input() index!: number;
    @Input() layout!: string;
    isPlaying: boolean = false;
    playingSongSub!: Subscription;
    canDelete: boolean = false;
    currentPlaylist!: Playlist;

    status!: string;
    statusSub!: Subscription;

    isMoreOptionsOpened: boolean = false;
    isAddToPlaylistPanelOpen: boolean = false;

    constructor(
        private uiManager: NotificationService,
        private songService: SongService,
        private playController: PlayControllerService
    ) {}

    ngOnInit(): void {
        this.currentPlaylist = this.songService.currentPlaylist;
        if (
            this.currentPlaylist.name !== Constants.ALL_SONGS &&
            this.currentPlaylist.name !== Constants.FAVOURITE_SONGS
        ) {
            this.canDelete = true;
        }
        this.playingSongSub = this.songService.playingSongChange.subscribe((song: Song) => {
            this.isPlaying = this.song.id === song.id;
        });
        this.statusSub = this.playController.statusChanged.subscribe((status: string) => {
            this.status = status;
        });
    }

    openNewPlaylistPanel() {
        this.toggleNewPlaylistPanel();
        this.isMoreOptionsOpened = false;
    }

    onSingleClick() {
        this.songService.removeSelectedAttribute();
        this.song.isSelected = true;
        this.songService.selectedSong = this.song;
    }

    onDoubleClick() {
        this.songService.playingSong = this.song;
        this.songService.currenSongIndex = this.index;
    }

    toggleNewPlaylistPanel() {
        this.isAddToPlaylistPanelOpen = !this.isAddToPlaylistPanelOpen;
    }

    onFavoriteClick() {
        this.song.isFavourite = !this.song.isFavourite;
        if (this.song.isFavourite) {
            this.songService.addToFavorites(this.song.id);
        } else {
            this.songService.removeFromFavorites(this.song.id);
        }
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Escape')
            if (this.isAddToPlaylistPanelOpen) {
                this.isAddToPlaylistPanelOpen = false;
            }
    }

    onDeletePlaylist() {
        this.songService.removeFromPlaylist(this.currentPlaylist.id, this.song.id);
        this.isMoreOptionsOpened = false;
        this.uiManager.showNotification('از پلی‌لیست حذف شد', false, () => {
            this.songService.addToPlaylist(this.currentPlaylist.id, this.song);
        });
    }

    onPlaySong() {
        if (!this.isPlaying) {
            if (this.songService.playingSong === undefined) {
                this.songService.playingSong = this.song;
            } else if (this.songService.playingSong.id === this.song.id) {
                this.playController.resume();
                this.isPlaying = true;
            } else {
                this.songService.playingSong = this.song;
            }
        } else {
            this.playController.pause();
            this.isPlaying = false;
        }
    }

    ngOnDestroy(): void {
        this.playingSongSub.unsubscribe();
        this.statusSub.unsubscribe();
    }
}
