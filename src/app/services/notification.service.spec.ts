import {TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';

describe('UiManagerService', () => {
    let service: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NotificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
