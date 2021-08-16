import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UiManagerService} from 'src/app/services/ui-manager.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public isCreateNewplaylistPanelOpen: Subscription = new Subscription();
    public isPanelOpen: boolean = false;

    public isAddtoPlaylistPanelOpenSub: Subscription = new Subscription();
    public isAddtoPlaylistPanelOpen: boolean = false;

    constructor(private uiManager: UiManagerService) {}

    ngOnInit(): void {
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
