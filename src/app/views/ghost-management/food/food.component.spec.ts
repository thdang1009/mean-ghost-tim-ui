import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractMockObservableService } from '@helpers/mockservice.service';
import { MealService } from '@services/_index';
import { FoodComponent } from './food.component';
class _MealService extends AbstractMockObservableService {
  getMyMeal() {
    return this;
  }
}
describe('FoodComponent', () => {
  let component: FoodComponent;
  let fixture: ComponentFixture<FoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FoodComponent,
      ],
      providers: [
        { provide: MealService, useValue: new _MealService() },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
