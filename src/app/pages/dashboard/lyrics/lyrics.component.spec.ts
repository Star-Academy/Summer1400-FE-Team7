import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {LyricsComponent} from './lyrics.component';
import {RouterTestingModule} from "@angular/router/testing";
 import {SongService} from "../../../services/song.service";

describe('LyricsComponent', () => {
  let component: LyricsComponent;
  let fixture: ComponentFixture<LyricsComponent>;
  let songService: SongService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LyricsComponent],
      providers: [SongService],
      imports: [HttpClientTestingModule, RouterTestingModule],

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    songService = TestBed.get(SongService);
  });

  it('SongService should be injected with same instance',
    inject([SongService], (injectService: SongService) => {
      expect(injectService).toBe(songService);
    })
  );
  it('playingSongSub should not be null after ngOnInit', () => {

    let playingSongSub = component.playingSongSub;
    component.ngOnInit();
    expect(playingSongSub).not.toBeNull();

  });


  it('onBackClick() should make isPanelOpen false and emit toggleLyric', () => {
    let isPanelOpen = component.isPanelOpen;
    spyOn(component.toggleLyric, 'emit');
    component.onBackClick();
    expect(isPanelOpen).toBeFalsy();
    expect(component.toggleLyric.emit).toHaveBeenCalled();

  });

  it('playingSong\'s id  should  be -1 ', () => {
    let playingSong = component.playingSong;
    expect(playingSong.id).toEqual(-1);


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
