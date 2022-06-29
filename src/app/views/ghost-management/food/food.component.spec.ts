import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealService } from '@services/_index';
import { FoodComponent } from './food.component';

describe('FoodComponent', () => {
  let component: FoodComponent;
  let fixture: ComponentFixture<FoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FoodComponent,
        { provide: MealService, useValue: {} },
      ],
      imports: [

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
