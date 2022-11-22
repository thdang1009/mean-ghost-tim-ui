import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MealService } from './meal.service';

describe('MealService', () => {
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
