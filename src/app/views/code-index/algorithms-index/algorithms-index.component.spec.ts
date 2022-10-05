import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmsIndexComponent } from './algorithms-index.component';

describe('AlgorithmsIndexComponent', () => {
  let component: AlgorithmsIndexComponent;
  let fixture: ComponentFixture<AlgorithmsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmsIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
