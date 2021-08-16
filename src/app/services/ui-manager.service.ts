import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UiManagerService {
    public isCreateNewplaylistPanelOpen = new Subject<boolean>();
    public isAddtoNewPlaylistPanelOpen = new Subject<boolean>();

    openCreatePlaylistPanel() {
        this.isCreateNewplaylistPanelOpen.next(true);
    }

    closeCreatePlaylistPanel() {
        this.isCreateNewplaylistPanelOpen.next(false);
    }

    openAddtoNewPlaylistPanel() {
        this.isAddtoNewPlaylistPanelOpen.next(true);
    }

    closeAddtoNewPlaylistPanel() {
        this.isAddtoNewPlaylistPanelOpen.next(false);
    }

    constructor() {}
}
