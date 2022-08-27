import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, AuthService } from '@services/_index';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['error']);
    const authenServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        UntypedFormBuilder,
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: AuthService, useValue: authenServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      declarations: [
        RegisterComponent,
      ],
      imports: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
