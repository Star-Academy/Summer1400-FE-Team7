import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { PlayControllerService } from 'src/app/services/play-controller.service';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-mobile-playback-controllers',
    templateUrl: './mobile-playback-controllers.component.html',
    styleUrls: ['./mobile-playback-controllers.component.scss'],
})
export class MobilePlaybackControllersComponent implements OnInit,OnDestroy {
  readonly statusTypes = {
    PLAYING: 'playing',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    LOADING: 'loading',
    MUTED: 'muted',
  };

  @Output() lyricToggle = new EventEmitter<void>();
    @Output() songPreviewToggle = new EventEmitter();
    status!:string;
    statusSub!:Subscription;
    onSongPreviewToggle() {
        this.songPreviewToggle.emit();
    }

    lyricToggler() {
        this.lyricToggle.emit();
    }

    constructor(private playController: PlayControllerService) {}

    ngOnInit(): void {
      this.status = this.playController.status;
      this.statusSub = this.playController.statusChanged.subscribe((status:string) => {
        this.status = status;
      })
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
        //TODO
        this.playController.pause();
        break;
    }  }

  ngOnDestroy(): void {
      this.statusSub.unsubscribe()
  }
}
