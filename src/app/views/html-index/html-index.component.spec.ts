import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlIndexComponent } from './html-index.component';

describe('HtmlIndexComponent', () => {
  let component: HtmlIndexComponent;
  let fixture: ComponentFixture<HtmlIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
