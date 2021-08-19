import {Component, OnInit, Input} from '@angular/core';
import {PlaylistItem} from 'src/app/models/playlistItem';
import {SongService} from 'src/app/services/song.service';
import {Subscription} from 'rxjs';
import {Song} from '../../models/song';
import {Playlist} from '../../models/playlist';
import {Constants} from '../../utils/constants';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
    public playlists!: PlaylistItem[];
    private initialPlaylists: PlaylistItem[] = [
        new PlaylistItem(Constants.ALL_SONGS, -1, '../../../../assets/images/playlist.svg', 'none', '', true),
        new PlaylistItem(Constants.FAVOURITE_SONGS, -2, '../../../assets/images/favourite.svg', 'none', '', false),
        new PlaylistItem(Constants.ALL_PLAYLISTS, -3, '../../../assets/images/playlist-add.svg', 'add', '', false),
    ];
    playlistsSub!: Subscription;

    @Input() public isOpen!: boolean;

    constructor(private songService: SongService) {
        this.playlistsSub = this.songService.allPlaylistsChanged.subscribe((data: Playlist[]) => {
            this.playlists = [];
            this.playlists = this.initialPlaylists.slice();
            data.forEach((playlist, index) => {
                if (playlist.name !== 'مورد علاقه') {
                    this.playlists.push(
                        new PlaylistItem(
                            playlist.name,
                            playlist.id,
                            '../../../assets/images/new-playlist.svg',
                            'remove',
                            '',
                            false
                        )
                    );
                }
            });
        });
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.playlistsSub.unsubscribe();
    }
}
