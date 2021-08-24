import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {NotificationComponent} from './notification.component';

import {NotificationService} from '../../../services/notification.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;
    let notificationService: NotificationService;
    let debug: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotificationComponent],
            providers: [NotificationService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        notificationService = TestBed.get(NotificationService);

        fixture.detectChanges();
    });

    it('NotificationService should be injected with same instance', inject(
        [NotificationService],
        (injectService: NotificationService) => {
            expect(injectService).toBe(notificationService);
        }
    ));

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

    it('should show alert', () => {
        component.show = true;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.show'));
        console.log(debug);
        expect(debug).not.toBeNull();

        component.show = false;
        fixture.detectChanges();
        debug = fixture.debugElement.query(By.css('.show'));
        expect(debug).toBeNull();
        debug = fixture.debugElement.query(By.css('.hide'));
        expect(debug).not.toBeNull();
    });

    it('should change value', () => {
        let message = 'new msg';
        component.message = message;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.msg')).nativeNode.innerText).toEqual(message);
    });

    it('should onClose() be called ', async () => {
        let fixture = TestBed.createComponent(NotificationComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        spyOn(app, 'onClose');
        compiled.querySelector('.close-btn').click();
        expect(app.onClose).toHaveBeenCalled();
    });
});
