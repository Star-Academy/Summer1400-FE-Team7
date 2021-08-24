import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileComponent } from './mobile.component';

describe('MobileComponent', () => {
  let component: MobileComponent;
  let fixture: ComponentFixture<MobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileComponent ]
    })
    .compileComponents();
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

    expect(isSongPreviewPanelOpen!==isSongPreviewPanelOpenAfterChange).toBeTruthy();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
