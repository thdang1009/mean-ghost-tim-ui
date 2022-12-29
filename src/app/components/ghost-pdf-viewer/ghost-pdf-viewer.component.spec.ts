import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostPdfViewerComponent } from './ghost-pdf-viewer.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('GhostPdfViewerComponent', () => {
  let component: GhostPdfViewerComponent;
  let fixture: ComponentFixture<GhostPdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GhostPdfViewerComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
            queryParams: of({ id: 123 })
          }
        },
      ]

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
