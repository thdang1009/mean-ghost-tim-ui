import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsIndexComponent } from './ts-index.component';

describe('TsIndexComponent', () => {
  let component: TsIndexComponent;
  let fixture: ComponentFixture<TsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
