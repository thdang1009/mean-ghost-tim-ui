import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TktCodeComponent } from './tkt-code.component';

describe('TktCodeComponent', () => {
  let component: TktCodeComponent;
  let fixture: ComponentFixture<TktCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TktCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TktCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
