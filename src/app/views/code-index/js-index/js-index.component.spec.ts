import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsIndexComponent } from './js-index.component';

describe('JsIndexComponent', () => {
  let component: JsIndexComponent;
  let fixture: ComponentFixture<JsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
