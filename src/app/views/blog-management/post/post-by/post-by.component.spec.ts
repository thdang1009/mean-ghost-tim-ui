import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AbstractMockObservableService } from '@app/_helpers/mockservice.service';
import { PostService } from '@app/_services/_index';
import { of } from 'rxjs';

import { PostByComponent } from './post-by.component';

class MockService extends AbstractMockObservableService {
  getPublicPosts() {
    return this;
  }
}
describe('PostByComponent', () => {
  let component: PostByComponent;
  let fixture: ComponentFixture<PostByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostByComponent],
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
    fixture = TestBed.createComponent(PostByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
