import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { RouterEvent, Router, ActivatedRoute } from '@angular/router';
import { CategoryService, AlertService } from '@services/_index';
import { of, ReplaySubject } from 'rxjs';

import { AddCategoryComponent } from './add-category.component';

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;

  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  beforeEach(async () => {
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['error']);
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategorys']);
    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [AddCategoryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
            queryParams: of({ id: 123 })
          },
        },
        UntypedFormBuilder,
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerMock },
        { provide: CategoryService, useValue: categoryServiceSpy }

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
