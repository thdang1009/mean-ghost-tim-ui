import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularIndexComponent } from './angular-index.component';

describe('AngularIndexComponent', () => {
  let component: AngularIndexComponent;
  let fixture: ComponentFixture<AngularIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
