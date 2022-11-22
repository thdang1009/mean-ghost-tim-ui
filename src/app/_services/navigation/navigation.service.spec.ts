import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';

describe('NavigationService', () => {
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      NavigationService,
      { provide: Router, useValue: mockRouter },
    ]
  }));

  it('should be created', () => {
    const service: NavigationService = TestBed.get(NavigationService);
    expect(service).toBeTruthy();
  });
});
