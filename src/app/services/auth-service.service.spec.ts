import {HttpClientTestingModule} from '@angular/common/http/testing';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {AuthService} from './auth.service';

describe('AuthServiceService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
