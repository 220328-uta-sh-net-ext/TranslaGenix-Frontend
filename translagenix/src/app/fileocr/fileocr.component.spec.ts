import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileocrComponent } from './fileocr.component';

describe('FileocrComponent', () => {
  let component: FileocrComponent;
  let fixture: ComponentFixture<FileocrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileocrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileocrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
