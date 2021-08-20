import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-mobile',
    templateUrl: './mobile.component.html',
    styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {
    @Output() toggleLyric = new EventEmitter<void>();

    lyricToggler() {
        this.toggleLyric.emit();
    }

    constructor() {}

    ngOnInit(): void {}
}
