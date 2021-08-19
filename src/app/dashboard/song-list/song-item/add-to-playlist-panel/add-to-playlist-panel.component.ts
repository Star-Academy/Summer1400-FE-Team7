import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {HostListener} from '@angular/core';

import {Song} from '../../../../models/song';

@Component({
    selector: 'app-add-to-playlist-panel',
    templateUrl: './add-to-playlist-panel.component.html',
    styleUrls: ['./add-to-playlist-panel.component.scss'],
})
export class AddToPlaylistPanelComponent implements OnInit {
    @Input() song!: Song;
    @Output() closeAddToNewPlaylistPanel = new EventEmitter<void>();

    playlists = [
        'test1',
        'test2',
        'test3',
        'test4',
        'test5',
        'test3',
        'test4',
        'test5',
        'test3',
        'test4',
        'test5',
        'test3',
        'test4',
        'test5',
    ];

    constructor() {}

    ngOnInit(): void {}

    closeNewPlaylistPanel() {
        this.closeAddToNewPlaylistPanel.emit();
    }
}
