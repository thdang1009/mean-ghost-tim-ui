import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostByComponent } from './post-by.component';

describe('PostByComponent', () => {
  let component: PostByComponent;
  let fixture: ComponentFixture<PostByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostByComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
