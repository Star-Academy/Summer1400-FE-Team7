import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { MobileBottomNavigationComponent } from './mobile-bottom-navigation.component';
import {SongService} from "../../../../services/song.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
 import {PlayControllerService} from "../../../../services/play-controller.service";

describe('mobile-bottom-navigationComponent', () => {
  let component: MobileBottomNavigationComponent;
  let fixture: ComponentFixture<MobileBottomNavigationComponent>;
  let songService: SongService;
  let playControllerService: PlayControllerService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileBottomNavigationComponent],
      providers:[SongService,PlayControllerService],

      imports: [BrowserModule,  HttpClientTestingModule, RouterTestingModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBottomNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    songService = TestBed.get(SongService);
    playControllerService = TestBed.get(PlayControllerService);

  });
  it('SongService should be injected with same instance',
    inject([SongService], (injectService: SongService) => {
      expect(injectService).toBe(songService);
    })
  );
  it('PlayControllerService should be injected with same instance',
    inject([PlayControllerService], (injectService: PlayControllerService) => {
      expect(injectService).toBe(playControllerService);
    })
  );
  it('status should not be null after ngOnInit', () => {

    let status= component.status;
    component.ngOnInit();
    expect(status).not.toBeNull();

  });
  it('statusSub should not be null after ngOnInit', () => {

    let statusSub= component.statusSub;
    component.ngOnInit();
    expect(statusSub).not.toBeNull();

  });
  it('playingSongSub should not be null after ngOnInit', () => {

    let playingSongSub= component.playingSongSub;
    component.ngOnInit();
    expect(playingSongSub).not.toBeNull();

  });
  it(' should call  playController.play if status == statusType.STOPPED', () => {
    let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
    fixture.detectChanges();
    spyOn(playControllerService, 'play');
    component.status = playControllerService.statusTypes.STOPPED;
    component.onPlay();
    expect(playControllerService.play).toHaveBeenCalled();
  });

  it(' should call  playController.pause if status == statusType.PLAYING', () => {
    let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
    fixture.detectChanges();
    spyOn(playControllerService, 'pause');
    component.status = playControllerService.statusTypes.PLAYING;
    component.onPlay();
    expect(playControllerService.pause).toHaveBeenCalled();
  });

  it(' should call  playController.resume if status == statusType.PAUSED', () => {
    let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
    fixture.detectChanges();
    spyOn(playControllerService, 'resume');
    component.status = playControllerService.statusTypes.PAUSED;
    component.onPlay();
    expect(playControllerService.resume).toHaveBeenCalled();
  });
  it('  should call  playController.pause  if status == statusType.LOADING ', () => {
    let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
    fixture.detectChanges();
    spyOn(playControllerService, 'pause');
    component.status = playControllerService.statusTypes.LOADING;
    component.onPlay();
    expect(playControllerService.pause).toHaveBeenCalled();

  });

  it('  should call  playController.pause  if status == statusType.MUTED ', () => {
    let playControllerService = fixture.debugElement.injector.get(PlayControllerService);
    fixture.detectChanges();
    spyOn(playControllerService, 'pause');

    component.status = playControllerService.statusTypes.MUTED;
    component.onPlay();
    expect(playControllerService.pause).toHaveBeenCalled();
  });


  it('lyricToggles() should emit  lyricToggle  ', () => {
    spyOn(component.lyricToggle, 'emit');
    component.lyricToggles();
    expect(component.lyricToggle.emit).toHaveBeenCalled();
  });
  it('onSongPreviewToggle() should emit  songPreviewToggle  ', () => {
    spyOn(component.songPreviewToggle, 'emit');
    component.onSongPreviewToggle();
    expect(component.songPreviewToggle.emit).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
