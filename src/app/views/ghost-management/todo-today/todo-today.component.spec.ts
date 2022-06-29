import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractMockObservableService } from '@helpers/mockservice.service';
import { JobService, TodoTodayService } from '@services/_index';

import { TodoTodayComponent } from './todo-today.component';
class _TodoTodayService extends AbstractMockObservableService {
  addTodoToday() {
    return this;
  }
  updateTodoToday() {
    return this;
  }
  getMyTodoToday() {
    return this;
  }
  deleteTodoToday() {
    return this;
  }
}
class _JobService extends AbstractMockObservableService {
  runJobManually() {
    return this;
  }
}

describe('TodoTodayComponent', () => {
  let component: TodoTodayComponent;
  let fixture: ComponentFixture<TodoTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoTodayComponent,
      ],
      providers: [
        {
          provide: TodoTodayService, useValue: new _TodoTodayService()
        },
        {
          provide: JobService, useValue: new _JobService()
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
