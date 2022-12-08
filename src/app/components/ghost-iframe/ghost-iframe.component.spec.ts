import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostIframeComponent } from './ghost-iframe.component';

describe('GhostIframeComponent', () => {
  let component: GhostIframeComponent;
  let fixture: ComponentFixture<GhostIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhostIframeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GhostIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
