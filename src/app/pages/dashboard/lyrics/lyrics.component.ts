import {Component, OnInit, EventEmitter, Output, Input, OnDestroy} from '@angular/core';
import {SongService} from "../../../services/song.service";
import {Song} from "../../../models/song";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-lyrics',
    templateUrl: './lyrics.component.html',
    styleUrls: ['./lyrics.component.scss'],
})
export class LyricsComponent implements OnInit ,OnDestroy{
    @Output() toggleLyric = new EventEmitter<void>();
    @Input() isPanelOpen!: boolean;

  playingSong: Song = new Song();
  playingSongSub!: Subscription;

    constructor(private songService: SongService) {}

    ngOnInit(): void {
       this.playingSongSub = this.songService.playingSongChange.subscribe((song: Song) => {
        this.playingSong = song;
       });
    }

    ngOnDestroy(): void {
    this.playingSongSub.unsubscribe();
    }

  onBackClick() {
    this.isPanelOpen=false;
    this.toggleLyric.emit();
  }
}
