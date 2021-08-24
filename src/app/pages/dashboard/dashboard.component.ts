import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {SongService} from 'src/app/services/song.service';
import {NotificationService} from 'src/app/services/notification.service';
import {Song} from '../../models/song';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    sideMenuOpen: boolean = true;
    isLyricPanelOpen: boolean = false;
    background: string = 'rgb(29, 125, 215)';

    playingSongSub!: Subscription;
    notificationSub!: Subscription;

    showNotification: boolean = false;
    isErrorNotification: boolean = false;
    messageNotification: string = '';

    constructor(
        private songService: SongService,
        private route: ActivatedRoute,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.songService.fetchPlaylist();
        this.route.queryParams.subscribe((params) => {
            if (params['playlist']) {
                this.songService.changeCurrentPlaylist(params['playlist']);
                this.songService.currentPlaylistName = params['playlist'];
            }
        });

        this.notificationSub = this.notificationService.notification.subscribe(
            (notification: {show: boolean; message: string; isError: boolean}) => {
                this.showNotification = notification.show;
                this.isErrorNotification = notification.isError;
                this.messageNotification = notification.message;
            }
        );
        this.playingSongSub = this.songService.playingSongChange.subscribe((song: Song) => {
            this.background = `url('${song.cover}')`;
        });
    }

    onToggleSideMenu = () => {
        this.sideMenuOpen = !this.sideMenuOpen;
    };

    lyricPanelToggle() {
        this.isLyricPanelOpen = !this.isLyricPanelOpen;
    }

    ngOnDestroy(): void {
        this.notificationSub.unsubscribe();
        this.playingSongSub.unsubscribe();
    }
}
