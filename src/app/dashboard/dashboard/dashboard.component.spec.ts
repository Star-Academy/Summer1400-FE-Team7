import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginFormComponent} from "../../auth/login-form/login-form.component";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {SongService} from "../../services/song.service";
import {NotificationService} from "../../services/notification.service";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let songService: SongService;
  let notificationService: NotificationService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers:[SongService,NotificationService],
      imports: [HttpClientTestingModule, RouterTestingModule],

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      songService = TestBed.get(SongService);
      notificationService = TestBed.get(NotificationService);

    });
    fixture.detectChanges();
  });
  it('SongService should be injected with same instance',
    inject([SongService], (injectService: SongService) => {
      expect(injectService).toBe(songService);
    })
  );
  it('NotificationService should be injected with same instance',
    inject([NotificationService], (injectService: NotificationService) => {
      expect(injectService).toBe(notificationService);
    })
  );


  it('playingSongSub should not be null after ngOninit', () => {

    let playingSongSub= component.playingSongSub;
    component.ngOnInit();
     expect(playingSongSub).not.toBeNull();

  });
  it('notificationSub should not be null after ngOnInit', () => {

    let notificationSub= component.notificationSub;
    component.ngOnInit();
    expect(notificationSub).not.toBeNull();

  });

  it('section 1 should have section-close class if isLyricPanelOpen is false', () => {
    let element: DebugElement = fixture.debugElement.query(By.css('.section-1'));
     expect(element.nativeNode.classList.contains('section-close')).toBeTruthy();
    component.isLyricPanelOpen = true;
    fixture.detectChanges();
    expect(element.nativeNode.classList.contains('section-close')).toBeFalsy();
  });

  it('song list should have side-menu-opened class if sideMenuOpen is true ', () => {
    let element: DebugElement = fixture.debugElement.query(By.css('.section-1'));
    let songList = element.nativeNode.childNodes[1].classList;

    expect(songList.contains('side-menu-opened')).toBeTruthy();
    component.sideMenuOpen = false;
    fixture.detectChanges();
    expect(songList.contains('side-menu-opened')).toBeFalsy();

   });

  it('lyricPanelToggle() should toggle isLyricPanelOpen', () => {

    let isLyricPanelOpen= component.isLyricPanelOpen;
    component.lyricPanelToggle();
    let isLyricPanelOpenAfterChange= component.isLyricPanelOpen;
    expect(isLyricPanelOpen!==isLyricPanelOpenAfterChange).toBeTruthy();


  });

  it('onToggleSideMenu() should toggle sideMenuOpen', () => {

    let sideMenuOpen= component.sideMenuOpen;
    component.onToggleSideMenu();
    let sideMenuOpenAfterChange= component.sideMenuOpen;
    expect(sideMenuOpen!==sideMenuOpenAfterChange).toBeTruthy();


  });



  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
