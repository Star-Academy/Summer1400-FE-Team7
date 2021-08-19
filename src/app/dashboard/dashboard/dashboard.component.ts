import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {SongService} from 'src/app/services/song.service';
import {UiManagerService} from 'src/app/services/ui-manager.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    sideMenuOpen: boolean = true;
    isLyricPanelOpen: boolean = false;

    public isCreateNewPlaylistPanelOpen: Subscription = new Subscription();

    public isPanelOpen: boolean = false;
    public isAddToPlaylistPanelOpenSub: Subscription = new Subscription();

    public isAddToPlaylistPanelOpen: boolean = false;

    constructor(private uiManager: UiManagerService, private songService: SongService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.songService.fetchSongs();
        this.songService.fetchPlaylist();
        this.route.queryParams.subscribe((params) => {
            if (params['playlist']) {
                this.songService.changeCurrentPlaylist(params['playlist']);
            }
        }); //TODO change this
        this.isCreateNewPlaylistPanelOpen = this.uiManager.isCreateNewplaylistPanelOpen.subscribe((state: boolean) => {
            this.isPanelOpen = state;
        });

        this.isAddToPlaylistPanelOpenSub = this.uiManager.isAddtoNewPlaylistPanelOpen.subscribe((state: boolean) => {
            this.isAddToPlaylistPanelOpen = state;
        });
    }

    ngOnDestroy(): void {
        this.isCreateNewPlaylistPanelOpen.unsubscribe();
        this.isAddToPlaylistPanelOpenSub.unsubscribe();
    }

    closeNewPlaylistPanel() {
        this.uiManager.closeCreatePlaylistPanel();
        this.uiManager.closeAddtoNewPlaylistPanel();
    }

    onToggleSideMenu = () => {
        this.sideMenuOpen = !this.sideMenuOpen;
    };

    lyricPanelToggle() {
        this.isLyricPanelOpen = !this.isLyricPanelOpen;
    }
}
