import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnalyticService } from './analytic.service';

describe('AnalyticService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      AnalyticService
    ]
  }));

  it('should be created', () => {
    const service: AnalyticService = TestBed.get(AnalyticService);
    expect(service).toBeTruthy();
  });
});
