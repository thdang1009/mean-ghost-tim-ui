import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongodbIndexComponent } from './mongodb-index.component';

describe('MongodbIndexComponent', () => {
  let component: MongodbIndexComponent;
  let fixture: ComponentFixture<MongodbIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MongodbIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MongodbIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
