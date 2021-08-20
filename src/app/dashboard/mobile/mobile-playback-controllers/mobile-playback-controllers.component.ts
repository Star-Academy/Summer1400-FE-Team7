import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-mobile-playback-controllers',
    templateUrl: './mobile-playback-controllers.component.html',
    styleUrls: ['./mobile-playback-controllers.component.scss'],
})
export class MobilePlaybackControllersComponent implements OnInit {
    @Output() lyricToggle = new EventEmitter<void>();

    lyricToggler() {
        this.lyricToggle.emit();
    }

    constructor() {}

    ngOnInit(): void {}
}
