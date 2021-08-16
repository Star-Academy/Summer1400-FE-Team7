import { TestBed } from '@angular/core/testing';

import { SongControllerService } from './song-controller.service';

describe('SongControllerService', () => {
  let service: SongControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
