import { TestBed } from '@angular/core/testing';

import { PlayControllerService } from './play-controller.service';

describe('SongControllerService', () => {
  let service: PlayControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
