import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';
import {SongService} from 'src/app/services/song.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  sideMenuOpen: boolean = true;
  isLyricPanelOpen: boolean = false;

  public isCreateNewPlaylistPanelOpen: Subscription = new Subscription();

  public isAddToPlaylistPanelOpenSub: Subscription = new Subscription();


  constructor(  private songService: SongService, private route: ActivatedRoute,
             ) {

  }

  ngOnInit(): void {
    this.songService.fetchPlaylist();
    this.route.queryParams.subscribe((params) => {
      if (params['playlist']) {
        this.songService.changeCurrentPlaylist(params['playlist']);
        this.songService.currentPlaylistName=params['playlist'];
      }
    });

  }

  ngOnDestroy(): void {
    this.isCreateNewPlaylistPanelOpen.unsubscribe();
    this.isAddToPlaylistPanelOpenSub.unsubscribe();
  }



  onToggleSideMenu = () => {
    this.sideMenuOpen = !this.sideMenuOpen;
  };

  lyricPanelToggle() {
    this.isLyricPanelOpen = !this.isLyricPanelOpen;
  }
}
