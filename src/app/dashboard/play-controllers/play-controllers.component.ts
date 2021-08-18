import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SongService} from 'src/app/services/song.service';
import {Song} from "../../models/song";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-play-controllers',
  templateUrl: './play-controllers.component.html',
  styleUrls: ['./play-controllers.component.scss']
})
export class PlayControllersComponent implements OnInit, OnDestroy {
  // @ViewChild('audio', {static: false}) audio!: HTMLAudioElement;
  readonly statusTypes = {
    PLAYING: "playing",
    PAUSED: "paused",
    STOPPED: "stopped",
    LOADING: "loading",
    MUTED: "muted",
  };

  readonly repeatTypes = {
    NO_REPEAT: "no-repeat",
    ONE_REPEAT: "one-repeat",
    ALL_REPEAT: "all-repeat",
  };
  audio: any = new Audio();
  status: string = this.statusTypes.STOPPED;
  repeatMode: string = this.repeatTypes.NO_REPEAT;
  shuffleMode: boolean = false;
  shuffleArray: number[] = [];
  shuffleIndex: number = 0;
  seekBarValue: number = 0;
  seekBarMaxvalue: number = 0;
  volumeBarValue: number = parseInt(localStorage.getItem('volume') || "5");
  volumeBeforeMute: number = this.volumeBarValue
  isMute: boolean = false;


  currentPlaylist!: Song[]
  currentPlaylistSub!: Subscription


  selectedSong: Song = new Song()
  selectedSongSub!: Subscription

  playingSong: Song = new Song()
  playingSongSub!: Subscription

  currentSongIndex!: number;
  currentSongIndexSub!: Subscription

  constructor(
    private songService: SongService) {

  }


  ngOnInit(): void {
    this.playingSong.cover = "../../../assets/images/default-song-cover.svg"
    this.audio.volume = this.volumeBarValue / 100;

    this.selectedSongSub = this.songService.selectedSongChange.subscribe((song: Song) => {
      this.selectedSong = song;
    })
    this.playingSongSub = this.songService.playingSongChange.subscribe((song: Song) => {
      this.playingSong = song;
      //this.audio.src=this.playingSong.file
      this.play()
    })
    this.currentSongIndexSub = this.songService.currenSongIndexChange.subscribe((index: number) => {
      this.currentSongIndex = index;
    })
    this.currentPlaylistSub = this.songService.currentPlaylistChanged.subscribe((data) => {
      this.currentPlaylist = data.songs;
    })


  }

  //TODO handle it
  onAudioError() {
    console.log("error")
  }

  loadMusic(index?: number) {
    if (index === undefined) {
      if (this.songService.playingSong === undefined) {
        this.audio.src = this.songService.selectedSong.file;
        this.songService.playingSong = this.songService.selectedSong
      } else {
        this.audio.src = this.playingSong.file;
      }
    } else {
      this.songService.playingSong = this.currentPlaylist[index]
    }
    this.audio.load();
  };


  play() {

    this.status = this.statusTypes.LOADING;
    this.loadMusic();

    this.audio.oncanplaythrough = () => {
      this.status = this.statusTypes.PLAYING;
      this.audio.play()
      this.seekBarMaxvalue = this.audio.duration;
    }
    this.audio.ontimeupdate = () => {
      this.seekBarValue = this.audio.currentTime;
    }
    this.audio.onended = ()=>{
      switch (this.repeatMode) {
        case this.repeatTypes.NO_REPEAT:
        case this.repeatTypes.ALL_REPEAT:
          this.nextSong();
          break;

        case this.repeatTypes.ONE_REPEAT:
          this.resume();
          break;
      }
    }

  }

  stop() {
    this.audio.pause();
    this.status = this.statusTypes.STOPPED;
  }

  pause() {
    this.audio.pause();
    this.status = this.statusTypes.PAUSED;
  }


  ngOnDestroy() {
    this.selectedSongSub.unsubscribe();
    this.playingSongSub.unsubscribe();
    this.currentSongIndexSub.unsubscribe();
    this.currentPlaylistSub.unsubscribe();
    //TODO fix it
    localStorage.setItem("volume", String(this.volumeBarValue))
  }

  resume() {
    this.status = this.statusTypes.PLAYING
    this.audio.play()
  }

  onPlay() {

    switch (this.status) {
      case this.statusTypes.STOPPED:
        this.play();
        break;
      case this.statusTypes.PLAYING:
        this.pause()
        break;
      case this.statusTypes.PAUSED:
        this.resume();
        break;
      default:
        break;
    }
  }

  updateMusicBarValue(seekBarValue: HTMLInputElement) {
    this.audio.currentTime = parseInt(seekBarValue.value);
    this.seekBarValue = parseInt(seekBarValue.value)

  }

  updateVolumeValue(volume: HTMLInputElement) {
    this.volumeBarValue = parseInt(volume.value);
    this.volumeBeforeMute = this.volumeBarValue;
    this.audio.volume = this.volumeBarValue / 100;
  }

  onMuteClick() {
    this.isMute = !this.isMute;
    if (this.isMute) {
      this.volumeBarValue = 0;
    } else {
      this.volumeBarValue = this.volumeBeforeMute;

    }

  }

  onNextSong() {
    this.nextSong()
  }

  private nextSong() {
    let stopOnLast:boolean=false;
    if (this.shuffleMode) {
      this.shuffleIndex++;
      if (this.shuffleIndex >= this.currentPlaylist.length) {
        this.shuffleIndex = 0;
      }
      this.songService.currenSongIndex = this.shuffleArray[this.shuffleIndex];
    } else {
      this.songService.currenSongIndex++
    }

    if (this.currentSongIndex >= this.currentPlaylist.length) {
      this.songService.currenSongIndex = 0;
      if (this.repeatMode == this.repeatTypes.NO_REPEAT && !this.shuffleMode) {
        this.pause();
        stopOnLast=true;
      }
    }
    if (!stopOnLast)
    this.loadMusic(this.songService.currenSongIndex);
  }


  onPreviousSong() {
    this.previousSong()
  }

  private previousSong() {
    if (this.shuffleMode) {
      this.shuffleIndex--;
      if (this.shuffleIndex < 0) {
        this.shuffleIndex = this.currentPlaylist.length - 1;
      }
      this.songService.currenSongIndex = this.shuffleArray[this.shuffleIndex];
    } else {
      this.songService.currenSongIndex--;
    }

    if (this.currentSongIndex < 0) {
      this.songService.currenSongIndex = this.currentPlaylist.length - 1;
    }

    this.loadMusic(this.songService.currenSongIndex);

  }


  onShuffle() {
    this.shuffleMode = !this.shuffleMode;
    if(this.shuffleMode)
      this.generateShuffleList()
  }


   shuffle(array:number[]){
    let tmp,
      current,
      top = array.length;
    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    return array;
  };

   generateShuffleList = () => {
    for (let i = 0; i < this.currentPlaylist.length; i++) this.shuffleArray[i] = i;
    this.shuffleArray = this.shuffle(this.shuffleArray);
  };

  onRepeatSong() {
    switch (this.repeatMode) {
      case this.repeatTypes.NO_REPEAT:
        this.repeatMode = this.repeatTypes.ONE_REPEAT;


        break;

      case this.repeatTypes.ONE_REPEAT:
        this.repeatMode = this.repeatTypes.ALL_REPEAT;


        break;

      case this.repeatTypes.ALL_REPEAT:
        this.repeatMode =this.repeatTypes.NO_REPEAT;



        break;
    }
  }
}
