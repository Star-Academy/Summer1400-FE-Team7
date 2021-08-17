import {Component, OnDestroy, OnInit} from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import {UiManagerService} from 'src/app/services/ui-manager.service';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-make-new-playlist',
    templateUrl: './make-new-playlist.component.html',
    styleUrls: ['./make-new-playlist.component.scss'],
})
export class MakeNewPlaylistComponent implements OnInit,OnDestroy {

  loadingSubscription: Subscription = new Subscription();
  errorSubscription: Subscription = new Subscription();
  completeSubscription: Subscription = new Subscription();

  loading = false;
  error = '';
  playlistName:string='';

    constructor(private uiManager: UiManagerService,private songService: SongService) {
      this.loadingSubscription = this.songService.loading.subscribe(
        (loading: boolean) => {
          this.loading = loading;
        }
      );

      this.errorSubscription = this.songService.error.subscribe(
        (error: string) => {
          this.error = error;
        }
      );
      this.completeSubscription = this.songService.complete.subscribe(
        (complete: boolean) => {
          if (complete) {
            this.uiManager.closeCreatePlaylistPanel();

          }

        }
      );
    }

    ngOnInit(): void {}

    closeNewPlaylistPanel() {
        this.uiManager.closeCreatePlaylistPanel();
    }

    createNewPlaylist(name:string) {
        this.songService.createNewPlaylist(name)
        //this.uiManager.closeCreatePlaylistPanel();
    }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
    this.errorSubscription.unsubscribe()
    this.completeSubscription.unsubscribe()
  }
}
