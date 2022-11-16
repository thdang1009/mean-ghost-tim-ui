import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AbstractMockObservableService } from '@app/_helpers/mock.service';
import { PostService, AuthService, CategoryService, TagService } from '@services/_index';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';

class MockService extends AbstractMockObservableService {
  getPublicPosts() {
    return this;
  }
  getCategorys() {
    return this;
  }
  isLogin() {
    return this;
  }
  getTags() {
    return this;
  }
}
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
      ],
      providers: [
        { provide: AuthService, useValue: MockService },
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
