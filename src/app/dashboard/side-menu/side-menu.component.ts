import {Component, OnInit} from '@angular/core';
import {PlaylistItem} from 'src/app/models/playlistItem';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
    public playlists: PlaylistItem[] = [
        new PlaylistItem('همه آهنگ‌ها', '../../../../assets/images/playlist.svg', 'none', '', true),
        new PlaylistItem('مورد علاقه', '../../../assets/images/favourite.svg', 'none', '', false),
        new PlaylistItem('پلی لیست‌ها', '../../../assets/images/playlist-add.svg', 'add', '', false),
    ];

    constructor() {}

    ngOnInit(): void {}
}
