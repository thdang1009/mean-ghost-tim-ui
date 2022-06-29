import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { MockElementRef } from '@helpers/mockservice.service';
import { AuthService } from '@services/_index';
import { of, ReplaySubject } from 'rxjs';

import { GuestNavbarComponent } from './guest-navbar.component';

describe('GuestNavbarComponent', () => {
  let component: GuestNavbarComponent;
  let fixture: ComponentFixture<GuestNavbarComponent>;

  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  beforeEach(async () => {
    const authenServiceSpy = jasmine.createSpyObj('AuthService', ['isLogin', 'isAdmin']);

    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [
        GuestNavbarComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authenServiceSpy },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 })
          }
        },
        
        { provide: ElementRef, useClass: MockElementRef }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
