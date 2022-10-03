import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownIndexComponent } from './markdown-index.component';

describe('MarkdownIndexComponent', () => {
  let component: MarkdownIndexComponent;
  let fixture: ComponentFixture<MarkdownIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkdownIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkdownIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
