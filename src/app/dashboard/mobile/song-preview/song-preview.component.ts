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
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
