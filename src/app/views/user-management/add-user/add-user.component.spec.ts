import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterEvent, Router } from '@angular/router';
import { UserService, AlertService } from '@services/_index';
import { ReplaySubject } from 'rxjs';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  beforeEach(async () => {
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['error']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      providers: [
        FormBuilder,
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceSpy}
        
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
