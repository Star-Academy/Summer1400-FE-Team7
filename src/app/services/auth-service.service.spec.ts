import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';

describe('AuthServiceService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('logoutUser() should call localStorage.removeItem()', () => {
        spyOn(localStorage, 'removeItem');
        service.logoutUser();
        expect(localStorage.removeItem).toHaveBeenCalled();
    });

    it('initializeUser() should call  localStorage.setItem()', () => {
        spyOn(localStorage, 'setItem');
        service.initializeUser({id: 1, token: 'token'}, 'email@example.com', true);
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('initializeUser() should call complete.next if createFavorites == false', () => {
        spyOn(service.complete, 'next');
        service.initializeUser({id: 1, token: 'token'}, 'email@example.com', false);
        expect(service.complete.next).toHaveBeenCalled();
    });
});
