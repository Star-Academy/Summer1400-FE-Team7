import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';
import { SongService } from 'src/app/services/song.service';
import {UiManagerService} from 'src/app/services/ui-manager.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit,OnDestroy,AfterViewInit {
    public isCreateNewplaylistPanelOpen: Subscription = new Subscription();
    public isPanelOpen: boolean = false;

    public isAddtoPlaylistPanelOpenSub: Subscription = new Subscription();
    public isAddtoPlaylistPanelOpen: boolean = false;

    constructor(private uiManager: UiManagerService,private songService: SongService,
                private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['playlist'])
      {
        this.songService.changeCurrentPlaylist(params['playlist']);
      }
    });    }

    ngOnInit(): void {
      this.songService.fetchSongs();
      this.songService.fetchPlaylist();

      //TODO change this
        this.isCreateNewplaylistPanelOpen = this.uiManager.isCreateNewplaylistPanelOpen.subscribe((state: boolean) => {
            this.isPanelOpen = state;
        });

        this.isAddtoPlaylistPanelOpenSub = this.uiManager.isAddtoNewPlaylistPanelOpen.subscribe((state: boolean) => {
            this.isAddtoPlaylistPanelOpen = state;
        });
    }


    ngOnDestroy(): void {
        this.isCreateNewplaylistPanelOpen.unsubscribe();
        this.isAddtoPlaylistPanelOpenSub.unsubscribe();
    }

    closeNewPlaylistPanel() {
        this.uiManager.closeCreatePlaylistPanel();
        this.uiManager.closeAddtoNewPlaylistPanel();
    }
}
