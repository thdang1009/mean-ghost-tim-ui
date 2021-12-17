import { TestBed, async, inject } from '@angular/core/testing';

import { GrandAdminGuard } from './grand-admin.guard';

describe('GrandAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrandAdminGuard]
    });
  });

  it('should ...', inject([GrandAdminGuard], (guard: GrandAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
