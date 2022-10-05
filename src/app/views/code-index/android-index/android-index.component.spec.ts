import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidIndexComponent } from './android-index.component';

describe('AndroidIndexComponent', () => {
  let component: AndroidIndexComponent;
  let fixture: ComponentFixture<AndroidIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndroidIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AndroidIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
