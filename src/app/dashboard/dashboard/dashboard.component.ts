import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {SongService} from 'src/app/services/song.service';
import {Constants} from "../../utils/constants";

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
              router: Router) {
    // router.navigate(['dashboard'], {queryParams: {playlist: Constants.ALL_SONGS}}).then();
    // //TODO
    // this.songService.changeCurrentPlaylist(Constants.ALL_SONGS);
  }

  ngOnInit(): void {
    this.songService.fetchPlaylist();
    this.route.queryParams.subscribe((params) => {
      if (params['playlist']) {
        this.songService.changeCurrentPlaylist(params['playlist']);
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
