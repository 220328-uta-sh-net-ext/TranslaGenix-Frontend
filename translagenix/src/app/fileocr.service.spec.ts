import { TestBed } from '@angular/core/testing';

import { FileocrService } from './fileocr.service';

describe('FileocrService', () => {
  let service: FileocrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileocrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
