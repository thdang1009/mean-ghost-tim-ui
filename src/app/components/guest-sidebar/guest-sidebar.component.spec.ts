import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestSidebarComponent } from './guest-sidebar.component';

describe('GuestSidebarComponent', () => {
  let component: GuestSidebarComponent;
  let fixture: ComponentFixture<GuestSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
