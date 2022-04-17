import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostPdfViewerComponent } from './ghost-pdf-viewer.component';

describe('GhostPdfViewerComponent', () => {
  let component: GhostPdfViewerComponent;
  let fixture: ComponentFixture<GhostPdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhostPdfViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
