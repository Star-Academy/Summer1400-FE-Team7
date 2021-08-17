import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import {Song} from "../../models/song";
import {PlayControllerService} from "../../services/play-controller.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-play-controllers',
  templateUrl: './play-controllers.component.html',
  styleUrls: ['./play-controllers.component.scss']
})
export class PlayControllersComponent implements OnInit,OnDestroy {
  @ViewChild('audio', { static: false }) audio!: HTMLAudioElement;

  selectedSong:Song=new Song()
  selectedSongSub!:Subscription

  playingSong:Song=new Song()
  playingSongSub!:Subscription
  constructor(private songControllerService:PlayControllerService,
              private songService:SongService) { }

  ngOnInit(): void {
    this.playingSong.cover="../../../assets/images/default-song-cover.svg"
    this.selectedSongSub=this.songService.selectedSongChange.subscribe((song:Song) => {
      this.selectedSong =song;
    })
    this.playingSongSub=this.songService.playingSongChange.subscribe((song:Song) => {
      this.playingSong =song;
      //this.audio.src=this.playingSong.file
    })
  }

  ngOnDestroy(){
    this.selectedSongSub.unsubscribe()
    this.playingSongSub.unsubscribe()
  }


  //TODO handle it
  onAudioError() {
    console.log("error")
  }
}
