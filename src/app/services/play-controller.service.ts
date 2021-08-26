import {Injectable} from '@angular/core';
import {Song} from '../models/song';
import {Subject, Subscription} from 'rxjs';
import {SongService} from './song.service';

@Injectable({
    providedIn: 'root',
})
export class PlayControllerService {
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
    private _status: string = this.statusTypes.STOPPED;
    private _repeatMode: string = this.repeatTypes.NO_REPEAT;
    private _shuffleMode: boolean = false;
    private _seekBarValue: number = 0;
    private _seekBarMaxvalue: number = 0;

    isMute: boolean = false;
    audio: any = new Audio();
    shuffleArray: number[] = [];
    shuffleIndex: number = 0;

    statusChanged = new Subject<string>();
    repeatModeChanged = new Subject<string>();
    shuffleModeChanged = new Subject<boolean>();
    seekBarValueChanged = new Subject<number>();
    seekBarMaxvalueChanged = new Subject<number>();

    currentPlaylist!: Song[];
    currentPlaylistSub!: Subscription;

    selectedSong: Song = new Song();
    selectedSongSub!: Subscription;

    playingSong: Song = new Song();
    playingSongSub!: Subscription;

    currentSongIndex!: number;
    currentSongIndexSub!: Subscription;

    constructor(private songService: SongService) {
        this.selectedSongSub = this.songService.selectedSongChange.subscribe((song: Song) => {
            this.selectedSong = song;
        });
        this.playingSongSub = this.songService.playingSongChange.subscribe((song: Song) => {
            this.playingSong = song;
        });
        this.currentSongIndexSub = this.songService.currenSongIndexChange.subscribe((index: number) => {
            this.currentSongIndex = index;
        });
        this.currentPlaylistSub = this.songService.currentPlaylistChanged.subscribe((data) => {
            this.currentPlaylist = data.songs;
        });
    }
    set seekBarMaxvalue(value: number) {
        this._seekBarMaxvalue = value;
        this.seekBarMaxvalueChanged.next(value);
    }
    get seekBarValue(): number {
        return this._seekBarValue;
    }

    set seekBarValue(value: number) {
        this._seekBarValue = value;
        this.seekBarValueChanged.next(value);
    }

    get shuffleMode(): boolean {
        return this._shuffleMode;
    }

    set shuffleMode(value: boolean) {
        this._shuffleMode = value;
        this.shuffleModeChanged.next(value);
    }

    get repeatMode(): string {
        return this._repeatMode;
    }

    set repeatMode(value: string) {
        this._repeatMode = value;
        this.repeatModeChanged.next(value);
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
        this.statusChanged.next(value);
    }

    loadMusic(index?: number) {
        if (index === undefined) {
            this.generatePlayingSong();
        } else {
            this.songService.playingSong = this.currentPlaylist[index];
        }
        this.audio.load();
    }

    generatePlayingSong() {
        if (this.songService.playingSong === undefined) {
            this.audio.src = this.songService.selectedSong.file;
            this.songService.playingSong = this.songService.selectedSong;
        } else {
            this.audio.src = this.playingSong.file;
        }
    }

    play() {
        this.status = this.statusTypes.LOADING;
        this.loadMusic();
        this.playSongWhenPossible();
        this.onAudioPlayTimeChange();
        this.onPlayEnded();
    }

    onPlayEnded() {
        this.audio.onended = () => {
            this.nextActionOnPlayEnd();
        };
    }

    nextActionOnPlayEnd() {
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

    onAudioPlayTimeChange() {
        this.updateSeekBarValue();
    }

    updateSeekBarValue() {
        this.audio.ontimeupdate = () => {
            this.seekBarValue = this.audio.currentTime;
        };
    }

    playSongWhenPossible() {
        this.audio.oncanplaythrough = () => {
            this.audioActionWhenCanPlay();
        };
    }

    audioActionWhenCanPlay() {
        if (this.status === this.statusTypes.LOADING) {
            this.status = this.statusTypes.PLAYING;
            this.audio.play();
            this.seekBarMaxvalue = this.audio.duration;
        } else if (this.status === this.statusTypes.PAUSED) {
            this.audio.pause();
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

    resume() {
        this.status = this.statusTypes.PLAYING;
        this.audio.play();
    }

    nextSong() {
        this.handleShuffleModeOnNextSong();
        this.handleNextSong();
    }

    handleShuffleModeOnNextSong() {
        if (this.shuffleMode) {
            this.shuffleIndex++;
            if (this.shuffleIndex >= this.currentPlaylist.length) {
                this.shuffleIndex = 0;
            }
            this.songService.currenSongIndex = this.shuffleArray[this.shuffleIndex];
        } else {
            this.songService.currenSongIndex++;
        }
    }

    handleNextSong() {
        let stopOnLast: boolean = false;
        if (this.currentSongIndex >= this.currentPlaylist.length) {
            this.songService.currenSongIndex = 0;
            if (this.repeatMode == this.repeatTypes.NO_REPEAT && !this.shuffleMode) {
                this.pause();
                stopOnLast = true;
            }
        }
        if (!stopOnLast) this.loadMusic(this.songService.currenSongIndex);
    }

    previousSong() {
        this.handleShuffleModeOnPreviousSong();
        this.handlePreviousSong();
    }

    handlePreviousSong() {
        if (this.currentSongIndex < 0) {
            this.songService.currenSongIndex = this.currentPlaylist.length - 1;
        }
        this.loadMusic(this.songService.currenSongIndex);
    }

    handleShuffleModeOnPreviousSong() {
        if (this.shuffleMode) {
            this.shuffleIndex--;
            if (this.shuffleIndex < 0) {
                this.shuffleIndex = this.currentPlaylist.length - 1;
            }
            this.songService.currenSongIndex = this.shuffleArray[this.shuffleIndex];
        } else {
            this.songService.currenSongIndex--;
        }
    }

    updateMusicBarValue(value: number) {
        this.audio.currentTime = value;
    }

     updateVolumeValue(volume: number) {
        this.audio.volume = volume / 100;
    }
    onMuteClick(volume: number) {
        this.audio.volume = volume / 100;
    }

    onShuffle() {
        this.shuffleMode = !this.shuffleMode;
        if (this.shuffleMode) this.generateShuffleList();
    }
    generateShuffleList = () => {
        for (let i = 0; i < this.currentPlaylist.length; i++) this.shuffleArray[i] = i;
        this.shuffleArray = this.shuffle(this.shuffleArray);
    };

    shuffle(array: number[]) {
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
    }

    onRepeatSong() {
        switch (this.repeatMode) {
            case this.repeatTypes.NO_REPEAT:
                this.repeatMode = this.repeatTypes.ONE_REPEAT;

                break;

            case this.repeatTypes.ONE_REPEAT:
                this.repeatMode = this.repeatTypes.ALL_REPEAT;

                break;

            case this.repeatTypes.ALL_REPEAT:
                this.repeatMode = this.repeatTypes.NO_REPEAT;

                break;
        }
    }
}
