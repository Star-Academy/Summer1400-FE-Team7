import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {PlayControllerService} from 'src/app/services/play-controller.service';
import {Subscription} from 'rxjs';
import {SongService} from '../../../../services/song.service';
import {Song} from '../../../../models/song';
import {Constants} from '../../../../utils/constants';

@Component({
    selector: 'app-mobile-playback-controllers',
    templateUrl: './mobile-bottom-navigation.component.html',
    styleUrls: ['./mobile-bottom-navigation.component.scss'],
})
export class MobileBottomNavigationComponent implements OnInit, OnDestroy {
    readonly statusTypes = {
        PLAYING: 'playing',
        PAUSED: 'paused',
        STOPPED: 'stopped',
        LOADING: 'loading',
        MUTED: 'muted',
    };

    @Output() lyricToggle = new EventEmitter<void>();
    @Output() songPreviewToggle = new EventEmitter<void>();
    navigationName = Constants;
    status!: string;
    statusSub!: Subscription;
    playingSongSub!: Subscription;
    playingSong: Song = new Song();
    playButtonSrc: string='../../../assets/images/controls/play-button.svg';

    onSongPreviewToggle() {
        this.songPreviewToggle.emit();
    }

    lyricToggles() {
        this.lyricToggle.emit();
    }

    constructor(private playController: PlayControllerService, private songService: SongService) {}

    ngOnInit(): void {
        this.status = this.playController.status;
        this.statusSub = this.playController.statusChanged.subscribe((status: string) => {
            this.status = status;
            this.playButtonSrc=
                status === this.statusTypes.PLAYING
                    ? '../../../assets/images/controls/pause.svg'
                    : status === this.statusTypes.LOADING
                        ? '../../../assets/images/controls/loading.svg'
                        : '../../../assets/images/controls/play-button.svg'

        });
        this.playingSongSub = this.songService.playingSongChange.subscribe((song: Song) => {
            this.playingSong = song;
        });
    }

    onPlay() {
        switch (this.status) {
            case this.playController.statusTypes.STOPPED:
                this.playController.play();
                break;
            case this.playController.statusTypes.PLAYING:
                this.playController.pause();
                break;
            case this.playController.statusTypes.PAUSED:
                this.playController.resume();
                break;
            default:
                this.playController.pause();
                break;
        }
    }

    ngOnDestroy(): void {
        this.statusSub.unsubscribe();
        this.playingSongSub.unsubscribe();
    }
}
