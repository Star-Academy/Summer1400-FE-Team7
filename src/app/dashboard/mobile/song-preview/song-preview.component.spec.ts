import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPreviewComponent } from './song-preview.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('SongPreviewComponent', () => {
  let component: SongPreviewComponent;
  let fixture: ComponentFixture<SongPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongPreviewComponent ],
      imports: [BrowserModule, FormsModule, HttpClientTestingModule, RouterTestingModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
