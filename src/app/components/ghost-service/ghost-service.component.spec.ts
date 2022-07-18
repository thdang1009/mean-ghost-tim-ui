import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostServiceComponent } from './ghost-service.component';

describe('GhostServiceComponent', () => {
  let component: GhostServiceComponent;
  let fixture: ComponentFixture<GhostServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhostServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
