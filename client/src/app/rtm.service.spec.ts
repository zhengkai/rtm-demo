import { TestBed } from '@angular/core/testing';

import { RtmService } from './rtm.service';

describe('RtmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RtmService = TestBed.get(RtmService);
    expect(service).toBeTruthy();
  });
});
