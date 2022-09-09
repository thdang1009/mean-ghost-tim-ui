import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AbstractMockObservableService } from '@app/_helpers/mockservice.service';
import { CategoryService, PostService, TagService } from '@app/_services/_index';
import { of } from 'rxjs';

import { PostListComponent } from './post-list.component';

class MockService extends AbstractMockObservableService {
  getTags() {
    return this;
  }
  getPublicPosts() {
    return this;
  }
  getCategorys() {
    console.log('12434', this.getCategorys);
    return this;
  }
}

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let mockDocument: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostListComponent
      ],
      providers: [
        { provide: PostService, useValue: MockService },
        { provide: TagService, useValue: MockService },
        { provide: CategoryService, useValue: MockService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
            queryParams: of({ id: 123 }),
            snapshot: {
              paramMap: {
                get(id) {
                  return '';
                }
              }
            }
          }
        },
        ChangeDetectorRef,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    mockDocument = TestBed.inject(DOCUMENT);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
