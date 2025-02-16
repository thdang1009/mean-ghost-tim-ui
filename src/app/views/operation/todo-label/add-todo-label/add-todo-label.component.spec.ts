import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { RouterEvent, Router, ActivatedRoute } from '@angular/router';
import { TodoLabelService, AlertService } from '@services/_index';
import { of, ReplaySubject } from 'rxjs';

import { AddTodoLabelComponent } from './add-todo-label.component';

describe('AddTodoLabelComponent', () => {
  let component: AddTodoLabelComponent;
  let fixture: ComponentFixture<AddTodoLabelComponent>;

  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  beforeEach(async () => {
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['error']);
    const todoLabelServiceSpy = jasmine.createSpyObj('TodoLabelService', ['getTodoLabels']);
    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [AddTodoLabelComponent],
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
        { provide: TodoLabelService, useValue: todoLabelServiceSpy }

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
