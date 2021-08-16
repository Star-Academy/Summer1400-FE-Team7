import {Component, OnInit, Input} from '@angular/core';
import {Song} from 'src/app/models/song';

@Component({
    selector: 'app-song-item',
    templateUrl: './song-item.component.html',
    styleUrls: ['./song-item.component.scss'],
})
export class SongItemComponent implements OnInit {
    @Input() song!: Song;

    isMoreOptionsOpened: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
