import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {PlayControllerService} from 'src/app/services/play-controller.service';
import {Subscription} from "rxjs";
import {SongService} from "../../../services/song.service";
import {Song} from "../../../models/song";

@Component({
  selector: 'app-mobile-playback-controllers',
  templateUrl: './mobile-playback-controllers.component.html',
  styleUrls: ['./mobile-playback-controllers.component.scss'],
})
export class MobilePlaybackControllersComponent implements OnInit, OnDestroy {
  readonly statusTypes = {
    PLAYING: 'playing',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    LOADING: 'loading',
    MUTED: 'muted',
  };

  @Output() lyricToggle = new EventEmitter<void>();
  @Output() songPreviewToggle = new EventEmitter<void>();
  status!: string;
  statusSub!: Subscription;
  playingSongSub!: Subscription;
  playingSong: Song = new Song();

  onSongPreviewToggle() {
    this.songPreviewToggle.emit();
  }

  lyricToggles() {
    this.lyricToggle.emit();
  }

  constructor(private playController: PlayControllerService, private songService: SongService) {
  }

  ngOnInit(): void {
    this.status = this.playController.status;
    this.statusSub = this.playController.statusChanged.subscribe((status: string) => {
      this.status = status;
    });
    this.playingSongSub = this.songService.playingSongChange.subscribe((song: Song) => {
      this.playingSong = song;
    });
  }

  onPlay() {
    switch (this.status) {
      case this.playController.statusTypes.STOPPED:
        this.playController.play()
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
