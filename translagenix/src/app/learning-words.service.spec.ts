import { TestBed } from '@angular/core/testing';

import { LearningWordsService } from './learning-words.service';

describe('LearningWordsService', () => {
  let service: LearningWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
