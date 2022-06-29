import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@services/_index';

import { NotLoginGuard } from './not-login.guard';

describe('NotLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotLoginGuard,
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} },
      ],
      imports: [
      ]
    });
  });

  it('should ...', inject([NotLoginGuard], (guard: NotLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
