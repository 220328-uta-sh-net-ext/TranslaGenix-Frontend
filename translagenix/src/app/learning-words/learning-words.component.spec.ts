import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningWordsComponent } from './learning-words.component';

describe('LearningWordsComponent', () => {
  let component: LearningWordsComponent;
  let fixture: ComponentFixture<LearningWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningWordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
