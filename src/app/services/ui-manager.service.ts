import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UiManagerService {
    public isCreateNewplaylistPanelOpen = new Subject<boolean>();

    openCreatePlaylistPanel() {
        this.isCreateNewplaylistPanelOpen.next(true);
    }

    closeCreatePlaylistPanel() {
        this.isCreateNewplaylistPanelOpen.next(false);
    }

    constructor() {}
}
