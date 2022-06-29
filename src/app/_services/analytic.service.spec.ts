import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnalyticService } from './analytic.service';

describe('AnalyticService', () => {
  let injector: TestBed;
  let service: AnalyticService;
  let httpMock: HttpTestingController;
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
