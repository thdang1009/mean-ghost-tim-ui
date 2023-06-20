import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfControlPanelComponent } from './pdf-control-panel.component';

describe('PdfControlPanelComponent', () => {
  let component: PdfControlPanelComponent;
  let fixture: ComponentFixture<PdfControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
