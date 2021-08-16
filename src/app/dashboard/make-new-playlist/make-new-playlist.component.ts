import {Component, OnInit} from '@angular/core';
import {UiManagerService} from 'src/app/services/ui-manager.service';

@Component({
    selector: 'app-make-new-playlist',
    templateUrl: './make-new-playlist.component.html',
    styleUrls: ['./make-new-playlist.component.scss'],
})
export class MakeNewPlaylistComponent implements OnInit {
    constructor(private uiManager: UiManagerService) {}

    ngOnInit(): void {}

    closeNewPlaylistPanel() {
        this.uiManager.closeCreatePlaylistPanel();
    }

    createNewPlaylist() {
        //TODO
        this.uiManager.closeCreatePlaylistPanel();
    }
}
