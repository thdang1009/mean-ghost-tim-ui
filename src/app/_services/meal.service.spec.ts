import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MealService } from './meal.service';

describe('MealService', () => {
  let injector: TestBed;
  let service: MealService;
  let httpMock: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      MealService
    ]
  }));

  it('should be created', () => {
    const service: MealService = TestBed.get(MealService);
    expect(service).toBeTruthy();
  });
});
