import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { NotificationComponent } from './notification.component';

import {NotificationService} from "../../../services/notification.service";

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers:[NotificationService],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.get(NotificationService);

    fixture.detectChanges();
  });
  it('NotificationService should be injected with same instance',
    inject([NotificationService], (injectService: NotificationService) => {
      expect(injectService).toBe(notificationService);
    })
  );
  it('onClose() should call  notificationService.undoNotification()  ', () => {
    let notificationService = fixture.debugElement.injector.get(NotificationService);
    fixture.detectChanges();
    spyOn(notificationService, 'undoNotification');
    component.onClose();
    expect(notificationService.undoNotification).toHaveBeenCalled();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});