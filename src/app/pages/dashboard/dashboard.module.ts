import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HmsTimePipe} from '../../pipes/hms-time.pipe';
import {MobileComponent} from './mobile/mobile.component';
import {MobileBottomNavigationComponent} from './mobile/mobile-bottom-navigation/mobile-bottom-navigation.component';
import {LikeHoverDirective} from '../../directives/like-hover.directive';
import {NotificationComponent} from './notification/notification.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PlaceholderComponent} from './song-list/placeholder/placeholder.component';

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
        MobileComponent,
        MobileBottomNavigationComponent,
        LikeHoverDirective,
        NotificationComponent,
        PlaceholderComponent,
    ],
    imports: [CommonModule, RouterModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
})
export class DashboardModule {}
