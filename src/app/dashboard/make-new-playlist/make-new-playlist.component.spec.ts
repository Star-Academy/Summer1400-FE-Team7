import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeNewPlaylistComponent } from './make-new-playlist.component';

describe('MakeNewPlaylistComponent', () => {
  let component: MakeNewPlaylistComponent;
  let fixture: ComponentFixture<MakeNewPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeNewPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeNewPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
