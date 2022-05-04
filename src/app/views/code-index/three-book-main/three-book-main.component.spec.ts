import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeBookMainComponent } from './three-book-main.component';

describe('ThreeBookMainComponent', () => {
  let component: ThreeBookMainComponent;
  let fixture: ComponentFixture<ThreeBookMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeBookMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeBookMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
