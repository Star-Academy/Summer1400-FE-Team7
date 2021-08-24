import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SongListComponent} from './song-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
 import {By} from '@angular/platform-browser';

describe('SongListComponent', () => {
    let component: SongListComponent;
    let fixture: ComponentFixture<SongListComponent>;
    let debug: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SongListComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SongListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have correct class', () => {
        component.changeLayoutViewHandler('list-view');
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.list-view'));
        expect(debug).not.toBeNull();
        debug = fixture.debugElement.query(By.css('.compact-list-view'));
        expect(debug).toBeNull();
        debug = fixture.debugElement.query(By.css('.grid-list-view'));
        expect(debug).toBeNull();

        component.changeLayoutViewHandler('compact-list-view');
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.compact-list-view'));
        expect(debug).not.toBeNull();
        debug = fixture.debugElement.query(By.css('.list-view'));
        expect(debug).toBeNull();
        debug = fixture.debugElement.query(By.css('.grid-list-view'));
        expect(debug).toBeNull();

        component.changeLayoutViewHandler('grid-view');
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.grid-view'));
        expect(debug).not.toBeNull();
        debug = fixture.debugElement.query(By.css('.compact-list-view'));
        expect(debug).toBeNull();
        debug = fixture.debugElement.query(By.css('.list-view'));
        expect(debug).toBeNull();
    });

    it('should have correct title', () => {
        let title = 'test';
        component.currentPlaylistName = title;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.song-list-header'));
        expect(debug.nativeNode.innerText).toBe(title);
     });

    it('should render app-placeholder component', () => {
        component.showPlaceholder = false;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.placeholder-test'));
        expect(debug).toBeNull();

        component.showPlaceholder = true;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.placeholder-test'));
        expect(debug).not.toBeNull();
    });


});
