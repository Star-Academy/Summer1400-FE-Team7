import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePlaybackControllersComponent } from './mobile-playback-controllers.component';
import {SongService} from "../../../services/song.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('MobilePlaybackControllersComponent', () => {
  let component: MobilePlaybackControllersComponent;
  let fixture: ComponentFixture<MobilePlaybackControllersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilePlaybackControllersComponent],
      imports: [BrowserModule,  HttpClientTestingModule, RouterTestingModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePlaybackControllersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
