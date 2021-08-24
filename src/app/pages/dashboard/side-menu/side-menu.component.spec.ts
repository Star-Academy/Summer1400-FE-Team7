import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SideMenuComponent} from './side-menu.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {AuthService} from 'src/app/services/auth.service';

describe('SideMenuComponent', () => {
    let component: SideMenuComponent;
    let fixture: ComponentFixture<SideMenuComponent>;
    let debug: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SideMenuComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should side-menu be open', () => {
        debug = fixture.debugElement.query(By.css('.side-menu'));
        component.isOpen = false;
        fixture.detectChanges();
        expect(debug.nativeNode.classList).not.toContain('side-menu-closed');

        component.isOpen = true;
        fixture.detectChanges();
        expect(debug.nativeNode.classList).toContain('side-menu-closed');
    });

    it('should show email correclty', () => {
        const email = 'parsa.arvaneh@gmail.com';
        component.email = email;

        debug = fixture.debugElement.query(By.css('#user-email'));
        fixture.detectChanges();

        expect(debug.nativeNode.innerText).toBe(email);
    });

    it('should render app-make-new-playlist component', () => {
        component.isPanelOpen = false;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.app-make-new-playlist-test'));
        expect(debug).toBeNull();

        component.isPanelOpen = true;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.app-make-new-playlist-test'));
        expect(debug).not.toBeNull();
    });

    it('should render dark-glass', () => {
        component.isPanelOpen = false;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.dark-glass'));
        expect(debug).toBeNull();

        component.isPanelOpen = true;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.dark-glass'));
        expect(debug).not.toBeNull();
    });

    it('should closePanel() work', () => {
        component.isPanelOpen = true;
        component.closePanel();
        expect(component.isPanelOpen).toBeFalsy();
    });

    it('should openAddNewPlaylistPanel() work', () => {
        component.isPanelOpen = false;
        component.openAddNewPlaylistPanel();
        expect(component.isPanelOpen).toBeTruthy();
    });

    it('should onLogOutClick call', () => {
        let authService = fixture.debugElement.injector.get(AuthService);
        fixture.detectChanges();
        spyOn(authService, 'logoutUser');
        component.onLogOutClick();
        expect(authService.logoutUser).toHaveBeenCalled();
    });

    it('variables should not be null after ngOnInit', () => {
        let status = component.email;
        localStorage.setItem('email', 'test');
        component.ngOnInit();
        expect(status).not.toBeNull();
    });

    it('should call onLogOutClick', async () => {
        let fixture = TestBed.createComponent(SideMenuComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app, 'onLogOutClick');
        fixture.debugElement.query(By.css('.profile-wrapper')).triggerEventHandler('click', {});
        expect(app.onLogOutClick).toHaveBeenCalled();
    });

    it('should call closePanel', async () => {
        let fixture = TestBed.createComponent(SideMenuComponent);
        let app = fixture.debugElement.componentInstance;
        app.isPanelOpen = true;
        fixture.detectChanges();
        spyOn(app, 'closePanel');
        fixture.debugElement.query(By.css('.dark-glass')).triggerEventHandler('click', {});
        expect(app.closePanel).toHaveBeenCalled();
    });
});
