import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostSiteBtnComponent } from './ghost-site-btn.component';

describe('GhostSiteBtnComponent', () => {
  let component: GhostSiteBtnComponent;
  let fixture: ComponentFixture<GhostSiteBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhostSiteBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostSiteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
