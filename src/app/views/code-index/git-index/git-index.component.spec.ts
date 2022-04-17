import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitIndexComponent } from './git-index.component';

describe('GitIndexComponent', () => {
  let component: GitIndexComponent;
  let fixture: ComponentFixture<GitIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
