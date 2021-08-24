import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SongItemComponent} from './song-item.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('SongItemComponent', () => {
    let component: SongItemComponent;
    let fixture: ComponentFixture<SongItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SongItemComponent],
          imports: [  HttpClientTestingModule, RouterTestingModule],

        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SongItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
