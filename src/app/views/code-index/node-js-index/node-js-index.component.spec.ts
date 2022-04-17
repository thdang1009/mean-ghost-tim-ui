import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeJsIndexComponent } from './node-js-index.component';

describe('NodeJsIndexComponent', () => {
  let component: NodeJsIndexComponent;
  let fixture: ComponentFixture<NodeJsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeJsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeJsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
