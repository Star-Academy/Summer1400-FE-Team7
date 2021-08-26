import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-mobile',
    templateUrl: './mobile.component.html',
    styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent     {
    @Output() toggleLyric = new EventEmitter<void>();

    isSongPreviewPanelOpen: boolean = false;

    lyricToggle() {
        this.toggleLyric.emit();
    }

    songPreviewToggle() {
        this.isSongPreviewPanelOpen = !this.isSongPreviewPanelOpen;
    }

    constructor() {}

 }
