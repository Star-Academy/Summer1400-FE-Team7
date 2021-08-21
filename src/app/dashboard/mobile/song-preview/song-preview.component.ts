import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Song} from "../../../models/song";
import {SongService} from "../../../services/song.service";
import {PlayControllerService} from "../../../services/play-controller.service";

@Component({
    selector: 'app-song-preview',
    templateUrl: './song-preview.component.html',
    styleUrls: ['./song-preview.component.scss'],
})
export class SongPreviewComponent implements OnInit,OnDestroy {
  readonly statusTypes = {
    PLAYING: 'playing',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    LOADING: 'loading',
    MUTED: 'muted',
  };

  readonly repeatTypes = {
    NO_REPEAT: 'no-repeat',
    ONE_REPEAT: 'one-repeat',
    ALL_REPEAT: 'all-repeat',
  };

  status!: string;
  statusSub!: Subscription;
  repeatMode!: string;
  repeatModeSub!: Subscription;
  shuffleMode!: boolean;
  shuffleModeSub!: Subscription;
  seekBarValue!: number;
  seekBarValueSub!: Subscription;
  seekBarMaxvalue: number = 0;
  seekBarMaxvalueSub!: Subscription;

  selectedSong: Song = new Song();


  selectedSongSub!: Subscription;
  playingSong: Song = new Song();

  playingSongSub!: Subscription;




  @Output() songPreviewToggle = new EventEmitter();

  onSongPreviewToggle() {
    this.songPreviewToggle.emit();
  }

  constructor(private songService: SongService,
              private playController: PlayControllerService) {
  }

    ngOnInit(): void {

      this.playingSong.cover = '../../../assets/images/default-song-cover.svg';
      if (this.songService.playingSong!== undefined){
        this.playingSong =this.songService.playingSong;
      }

      this.status = this.playController.status;
      this.repeatMode = this.playController.repeatMode;
      this.shuffleMode = this.playController.shuffleMode;
      this.seekBarValue = this.playController.seekBarValue;
      this.statusSub = this.playController.statusChanged.subscribe((status: string) => {
        this.status = status;
      });
      this.repeatModeSub = this.playController.repeatModeChanged.subscribe((repeatMode: string) => {
        this.repeatMode = repeatMode;
      });
      this.shuffleModeSub = this.playController.shuffleModeChanged.subscribe((shuffleMode: boolean) => {
        this.shuffleMode = shuffleMode;
      });
      this.seekBarValueSub = this.playController.seekBarValueChanged.subscribe((seekBarValue: number) => {
        this.seekBarValue = seekBarValue;

      });
      this.seekBarMaxvalueSub = this.playController.seekBarMaxvalueChanged.subscribe((seekBarMaxvalue: number) => {
        this.seekBarMaxvalue = seekBarMaxvalue;
      });


      this.selectedSongSub = this.songService.selectedSongChange.subscribe((song: Song) => {
        this.selectedSong = song;
      });
      this.playingSongSub = this.songService.playingSongChange.subscribe((song: Song) => {
        this.playingSong = song;
        this.playController.play();
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
        //TODO
        this.playController.pause();
        break;
    }

  }
  onNextSong() {
    this.playController.nextSong();
  }


  onPreviousSong() {
    this.playController.previousSong();
  }


  onShuffle() {
    this.playController.onShuffle();
  }

  onRepeatSong() {
    this.playController.onRepeatSong();

  }

  onChangeMusicBarValue(seekBar: HTMLInputElement) {
    this.playController.updateMusicBarValue(parseInt(seekBar.value));
  }

  ngOnDestroy() {
    this.selectedSongSub.unsubscribe();
    this.playingSongSub.unsubscribe();

    this.statusSub.unsubscribe();
    this.repeatModeSub.unsubscribe();
    this.shuffleModeSub.unsubscribe();
    this.seekBarValueSub.unsubscribe();
    this.seekBarMaxvalueSub.unsubscribe();

    //TODO fix it
    // localStorage.setItem('volume', String(this.volumeBarValue));
  }

  onFavoriteClick() {
    //
  }
}
