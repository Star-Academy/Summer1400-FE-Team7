import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SongService} from 'src/app/services/song.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-make-new-playlist',
    templateUrl: './make-new-playlist.component.html',
    styleUrls: ['./make-new-playlist.component.scss'],
})
export class MakeNewPlaylistComponent implements OnInit, OnDestroy {
    @Output() closeCreatePlaylistPanel = new EventEmitter<void>();

    loadingSubscription: Subscription = new Subscription();
    errorSubscription: Subscription = new Subscription();
    completeSubscription: Subscription = new Subscription();

    loading = false;
    error = '';
    playlistName: string = '';

    constructor(private songService: SongService) {
        this.loadingSubscription = this.songService.loading.subscribe((loading: boolean) => {
            this.loading = loading;
        });

        this.errorSubscription = this.songService.error.subscribe((error: string) => {
            this.error = error;
        });
        this.completeSubscription = this.songService.complete.subscribe((complete: boolean) => {
            if (complete) {
                this.closeCreatePlaylistPanel.emit();
            }
        });
    }

    ngOnInit(): void {}

    closeNewPlaylistPanel() {
        this.closeCreatePlaylistPanel.emit();
    }

    createNewPlaylist(name: string) {
        this.songService.createNewPlaylist(name);
    }

    ngOnDestroy(): void {
        this.loadingSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
        this.completeSubscription.unsubscribe();
    }
}
