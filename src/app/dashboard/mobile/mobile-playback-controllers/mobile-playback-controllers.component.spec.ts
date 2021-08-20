import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePlaybackControllersComponent } from './mobile-playback-controllers.component';

describe('MobilePlaybackControllersComponent', () => {
  let component: MobilePlaybackControllersComponent;
  let fixture: ComponentFixture<MobilePlaybackControllersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilePlaybackControllersComponent ]
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
