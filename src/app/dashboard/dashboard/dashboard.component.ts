import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {SongService} from 'src/app/services/song.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  sideMenuOpen: boolean = true;
  isLyricPanelOpen: boolean = false;

  public notificationSub: Subscription = new Subscription();

  public showNotification: boolean = false;
  public isErrorNotification: boolean = false;
  public messageNotification: string = "";

//TODO on refresh other play list
  constructor(private songService: SongService
              , private route: ActivatedRoute,
              private uiManager:NotificationService) {}

  ngOnInit(): void {
    this.songService.fetchPlaylist();
    this.route.queryParams.subscribe((params) => {
      if (params['playlist']) {
        this.songService.changeCurrentPlaylist(params['playlist']);
        this.songService.currentPlaylistName = params['playlist'];
      }
    });

    this.notificationSub = this.uiManager.notification
      .subscribe((notification:{show:boolean,message: string,isError: boolean})=>{
        this.showNotification=notification.show;
        this.isErrorNotification=notification.isError;
        this.messageNotification=notification.message;
    })

  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
  }


  onToggleSideMenu = () => {
    this.sideMenuOpen = !this.sideMenuOpen;
  };

  lyricPanelToggle() {
    this.isLyricPanelOpen = !this.isLyricPanelOpen;
  }
}
