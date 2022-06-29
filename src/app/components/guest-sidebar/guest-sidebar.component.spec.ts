import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { AuthService } from '@services/_index';
import { of, ReplaySubject } from 'rxjs';

import { GuestSidebarComponent } from './guest-sidebar.component';

describe('GuestSidebarComponent', () => {
  let component: GuestSidebarComponent;
  let fixture: ComponentFixture<GuestSidebarComponent>;
  
  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;


  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLogin']);
    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    await TestBed.configureTestingModule({
      declarations: [
        GuestSidebarComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy},
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 })
          }
        },
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
