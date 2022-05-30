import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressWithLabelComponent } from './progress-with-label.component';

describe('ProgressWithLabelComponent', () => {
  let component: ProgressWithLabelComponent;
  let fixture: ComponentFixture<ProgressWithLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressWithLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
