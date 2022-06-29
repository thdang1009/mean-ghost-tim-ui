import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@services/_index';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} },
      ],
      imports: [
      ]
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
