import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';

@Component({
    selector: 'app-lyrics',
    templateUrl: './lyrics.component.html',
    styleUrls: ['./lyrics.component.scss'],
})
export class LyricsComponent implements OnInit {
    @Output() toggleLyric = new EventEmitter<void>();
    @Input() isPanelOpen!: boolean;

    constructor() {}

    ngOnInit(): void {}
}
