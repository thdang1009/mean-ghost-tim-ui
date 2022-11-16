import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AbstractMockObservableService } from '@app/_helpers/mock.service';
import { PostService } from '@app/_services/_index';
import { of } from 'rxjs';

import { PostDetailComponent } from './post-detail.component';

class MockService extends AbstractMockObservableService {
  getPost() {
    return this;
  }
}

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        {
          provide: PostService, useValue: new MockService()
        },
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
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
