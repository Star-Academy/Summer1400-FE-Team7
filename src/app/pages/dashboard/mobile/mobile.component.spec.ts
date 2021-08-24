import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {MobileComponent} from './mobile.component';

describe('MobileComponent', () => {
    let component: MobileComponent;
    let fixture: ComponentFixture<MobileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MobileComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('songPreviewToggle() should toggle isSongPreviewPanelOpen  ', () => {
        let isSongPreviewPanelOpen = component.isSongPreviewPanelOpen;
        component.songPreviewToggle();
        let isSongPreviewPanelOpenAfterChange = component.isSongPreviewPanelOpen;

        expect(isSongPreviewPanelOpen !== isSongPreviewPanelOpenAfterChange).toBeTruthy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('toggleLyric() should emit onToggleLyric', async () => {
        let fixture = TestBed.createComponent(MobileComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app.toggleLyric, 'emit');
        app.lyricToggle();
        expect(app.toggleLyric.emit).toHaveBeenCalled();
    });

    it('should show app-play-controllers-component', () => {
        component.isSongPreviewPanelOpen = false;
        fixture.detectChanges();
        let debug: DebugElement = fixture.debugElement.query(By.css('#app-play-conrtollers'));
        expect(debug).toBeNull();

        component.isSongPreviewPanelOpen = true;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('#app-play-conrtollers'));
        expect(debug).not.toBeNull();
    });

    it('should show dark glass', () => {
        component.isSongPreviewPanelOpen = false;
        fixture.detectChanges();
        let debug: DebugElement = fixture.debugElement.query(By.css('.dark-glass'));
        expect(debug).toBeNull();

        component.isSongPreviewPanelOpen = true;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.dark-glass'));
        expect(debug).not.toBeNull();
    });
});
