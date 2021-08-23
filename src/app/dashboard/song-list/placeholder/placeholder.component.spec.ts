import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {SongService} from 'src/app/services/song.service';

import {PlaceholderComponent} from './placeholder.component';
import {BrowserModule, By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';

describe('PlaceholderComponent', () => {
    let component: PlaceholderComponent;
    let fixture: ComponentFixture<PlaceholderComponent>;
    let debug: any;
    let songService: SongService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlaceholderComponent],
            imports: [BrowserModule, HttpClientTestingModule, RouterTestingModule],
            providers: [SongService],
        })
            .compileComponents()
            .then(() => {
                songService = TestBed.get(SongService);
            });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlaceholderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render placeholder count correctly', () => {
        let count = 20;
        component.placeholdersCount = count;
        fixture.detectChanges();
        debug = fixture.debugElement.queryAll(By.css('.place-holders'));
        expect(debug.length).toEqual(count);
    });

    it('songService should be injected with same instance', inject([SongService], (injectService: SongService) => {
        expect(injectService).toBe(songService);
    }));
});
