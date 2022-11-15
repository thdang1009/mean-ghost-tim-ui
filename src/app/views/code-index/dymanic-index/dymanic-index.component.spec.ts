import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DymanicIndexComponent } from './dymanic-index.component';

describe('DymanicIndexComponent', () => {
  let component: DymanicIndexComponent;
  let fixture: ComponentFixture<DymanicIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DymanicIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DymanicIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
