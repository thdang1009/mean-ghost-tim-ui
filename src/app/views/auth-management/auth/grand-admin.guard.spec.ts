import { HttpClient } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@services/_index';

import { GrandAdminGuard } from './grand-admin.guard';

describe('GrandAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GrandAdminGuard,
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} },
      ],
      imports: [
      ]
    }).compileComponents();
  });

  it('should ...', inject([GrandAdminGuard], (guard: GrandAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
