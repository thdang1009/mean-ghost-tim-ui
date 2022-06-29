import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@services/_index';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} },
      ]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
