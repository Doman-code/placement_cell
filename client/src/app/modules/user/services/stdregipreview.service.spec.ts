import { TestBed } from '@angular/core/testing';

import { StdregipreviewService } from './stdregipreview.service';

describe('StdregipreviewService', () => {
  let service: StdregipreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StdregipreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
