import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ReplaySubject } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  beforeEach(async(() => {
    const authenServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
      ],
      providers: [
        UntypedFormBuilder,
        { provide: AuthService, useValue: authenServiceSpy },
        { provide: Router, useValue: routerMock },
      ],
      imports: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
