import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuItemComponent} from './menu-item.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PlaylistItem} from 'src/app/models/playlistItem';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {SongService} from 'src/app/services/song.service';

describe('MenuItemComponent add switch', () => {
    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;
    let parentDiv: DebugElement;

    let playlistItem = new PlaylistItem('nametest', -3, '../../../assets/images/playlist-add.svg', 'add', '', false);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuItemComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        component.playlistItem = playlistItem;
        parentDiv = fixture.debugElement.query(By.css('div'));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be add type', () => {
        playlistItem = new PlaylistItem('nametest', -3, '../../../assets/images/playlist-add.svg', 'add', '', false);
        component.playlistItem = playlistItem;
        fixture.detectChanges();
        expect(parentDiv.children[0].nativeNode.classList).toContain('add-class');
    });

    it('should call openNewPlaylistPanel emit', () => {
        spyOn(component.openAddNewPlaylistPanel, 'emit');
        component.openNewPlaylistPanel();
        expect(component.openAddNewPlaylistPanel.emit).toHaveBeenCalled();
    });

    it('should call onRemove emit', () => {
        let songService = fixture.debugElement.injector.get(SongService);
        fixture.detectChanges();
        spyOn(songService, 'removePlaylist');
        component.onRemove();
        expect(songService.removePlaylist).toHaveBeenCalled();
    });
});

describe('MenuItemComponent remove switch', () => {
    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;
    let parentDiv: DebugElement;

    let playlistItem = new PlaylistItem('nametest', -3, '../../../assets/images/playlist-add.svg', 'remove', '', false);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuItemComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        component.playlistItem = playlistItem;
        parentDiv = fixture.debugElement.query(By.css('div'));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be remove type', () => {
        playlistItem = new PlaylistItem('nametest', -3, '../../../assets/images/playlist-add.svg', 'remove', '', false);
        component.playlistItem = playlistItem;
        fixture.detectChanges();
        expect(parentDiv.children[0].nativeNode.classList).toContain('remove-class');
    });
});

describe('MenuItemComponent default switch', () => {
    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;
    let parentDiv: DebugElement;

    let playlistItem = new PlaylistItem(
        'nametest',
        -3,
        '../../../assets/images/playlist-add.svg',
        'default',
        '',
        false
    );

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuItemComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        component.playlistItem = playlistItem;
        parentDiv = fixture.debugElement.query(By.css('div'));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be defaultType', () => {
        playlistItem = new PlaylistItem(
            'nametest',
            -3,
            '../../../assets/images/playlist-add.svg',
            'defaultShit',
            '',
            false
        );
        component.playlistItem = playlistItem;
        fixture.detectChanges();
        expect(parentDiv.children[0].nativeNode.classList).toContain('default-class');
    });
});
