import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {PlayControllersComponent} from './play-controllers/play-controllers.component';
import {SongListComponent} from './song-list/song-list.component';
import {LyricsComponent} from './lyrics/lyrics.component';
import {MakeNewPlaylistComponent} from './side-menu/menu-item/make-new-playlist/make-new-playlist.component';
import {LayoutManagerComponent} from './song-list/layout-manager/layout-manager.component';
import {MenuItemComponent} from './side-menu/menu-item/menu-item.component';
import {SearchComponent} from './side-menu/search/search.component';
import {SongItemComponent} from './song-list/song-item/song-item.component';
import {AddToPlaylistPanelComponent} from './song-list/song-item/add-to-playlist-panel/add-to-playlist-panel.component';
import {FormsModule} from '@angular/forms';
import {HmsTimePipe} from '../pipes/hms-time.pipe';

@NgModule({
    declarations: [
        DashboardComponent,
        SideMenuComponent,
        PlayControllersComponent,
        SongListComponent,
        LyricsComponent,
        MakeNewPlaylistComponent,
        LayoutManagerComponent,
        MenuItemComponent,
        SearchComponent,
        SongItemComponent,
        AddToPlaylistPanelComponent,
        HmsTimePipe,
    ],
    imports: [CommonModule, RouterModule, FormsModule],
})
export class DashboardModule {}
