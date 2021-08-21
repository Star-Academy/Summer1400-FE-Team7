import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-song-preview',
    templateUrl: './song-preview.component.html',
    styleUrls: ['./song-preview.component.scss'],
})
export class SongPreviewComponent implements OnInit {
    constructor() {}

    @Output() songPreviewToggle = new EventEmitter();

    onSongPreviewToggle() {
        this.songPreviewToggle.emit();
    }

    ngOnInit(): void {}
}
