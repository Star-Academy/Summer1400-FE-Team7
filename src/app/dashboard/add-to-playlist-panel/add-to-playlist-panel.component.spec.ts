import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToPlaylistPanelComponent } from './add-to-playlist-panel.component';

describe('AddToPlaylistPanelComponent', () => {
  let component: AddToPlaylistPanelComponent;
  let fixture: ComponentFixture<AddToPlaylistPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToPlaylistPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToPlaylistPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
