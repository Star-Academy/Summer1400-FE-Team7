import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SongService} from 'src/app/services/song.service';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let songService: SongService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(SearchComponent);
                component = fixture.componentInstance;
                songService = TestBed.inject(SongService);
            });
        fixture.detectChanges();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('SongService should be injected with same instance', inject([SongService], (injectService: SongService) => {
        expect(injectService).toBe(songService);
    }));

    it('should emit performSearch', () => {
        let songService = fixture.debugElement.injector.get(SongService);
        fixture.detectChanges();
        spyOn(songService, 'searchSongsByName');
        component.performSearch('test');
        expect(songService.searchSongsByName).toHaveBeenCalled();
    });

    it('variables should not be null after ngOnInit', () => {
        let status = component.obs;
        component.ngOnInit();
        expect(status).not.toBeNull();
    });
});
