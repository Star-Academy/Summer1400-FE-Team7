import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-mobile',
    templateUrl: './mobile.component.html',
    styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {
    @Output() toggleLyric = new EventEmitter<void>();

    isSongPreviewPanelOpen: boolean = false;

    lyricToggle() {
        this.toggleLyric.emit();
    }

    songPreviewToggle() {
        this.isSongPreviewPanelOpen = !this.isSongPreviewPanelOpen;
    }

    constructor() {}

    ngOnInit(): void {}
}
