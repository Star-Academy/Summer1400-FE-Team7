import {Component, OnInit} from '@angular/core';
import {UiManagerService} from 'src/app/services/ui-manager.service';

@Component({
    selector: 'app-add-to-playlist-panel',
    templateUrl: './add-to-playlist-panel.component.html',
    styleUrls: ['./add-to-playlist-panel.component.scss'],
})
export class AddToPlaylistPanelComponent implements OnInit {
    constructor(private uiManager: UiManagerService) {}

    ngOnInit(): void {}
}
