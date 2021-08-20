import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Landing2Component } from './landing2.component';

describe('Landing2Component', () => {
  let component: Landing2Component;
  let fixture: ComponentFixture<Landing2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Landing2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Landing2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
