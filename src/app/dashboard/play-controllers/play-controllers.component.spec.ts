import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayControllersComponent } from './play-controllers.component';

describe('PlayControllersComponent', () => {
  let component: PlayControllersComponent;
  let fixture: ComponentFixture<PlayControllersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayControllersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayControllersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
