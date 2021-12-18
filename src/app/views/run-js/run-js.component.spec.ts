import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunJsComponent } from './run-js.component';

describe('RunJsComponent', () => {
  let component: RunJsComponent;
  let fixture: ComponentFixture<RunJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunJsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
