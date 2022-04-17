import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactIndexComponent } from './react-index.component';

describe('ReactIndexComponent', () => {
  let component: ReactIndexComponent;
  let fixture: ComponentFixture<ReactIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
