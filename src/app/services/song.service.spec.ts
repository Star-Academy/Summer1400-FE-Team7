import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {SongService} from './song.service';

describe('SongService', () => {
    let service: SongService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
        });
        service = TestBed.inject(SongService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
