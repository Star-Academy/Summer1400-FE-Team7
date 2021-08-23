import {TestBed} from '@angular/core/testing';

import {PlayControllerService} from './play-controller.service';
import {SongService} from './song.service';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('PlayControllerService', () => {
    let service: PlayControllerService;
    let service2: SongService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, HttpClientTestingModule, RouterTestingModule],
        });
        service = TestBed.inject(PlayControllerService);
        service2 = TestBed.inject(SongService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(service2).toBeTruthy();
    });
});
