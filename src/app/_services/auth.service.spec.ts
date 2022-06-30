import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthService', () => {
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      AuthService,
      { provide: Router, useValue: mockRouter },
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: 123 })
        }
      }
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
