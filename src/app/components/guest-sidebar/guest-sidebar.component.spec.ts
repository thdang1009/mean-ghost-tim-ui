import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/_index';

import { GuestSidebarComponent } from './guest-sidebar.component';

describe('GuestSidebarComponent', () => {
  let component: GuestSidebarComponent;
  let fixture: ComponentFixture<GuestSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GuestSidebarComponent,
        { provide: AuthService, useValue: {}},
        { provide: Router, useValue: {}},
        { provide: ActivatedRoute, useValue: {}},
      ]
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
