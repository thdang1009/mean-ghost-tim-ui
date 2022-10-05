import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactNativeIndexComponent } from './react-native-index.component';

describe('ReactNativeIndexComponent', () => {
  let component: ReactNativeIndexComponent;
  let fixture: ComponentFixture<ReactNativeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactNativeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactNativeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
