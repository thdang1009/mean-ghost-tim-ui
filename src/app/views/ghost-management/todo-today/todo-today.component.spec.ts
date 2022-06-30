import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractMockObservableService } from '@helpers/mockservice.service';
import { JobService, TodoTodayService } from '@services/_index';

import { TodoTodayComponent } from './todo-today.component';
class MockTodoTodayService extends AbstractMockObservableService {
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
class MockJobService extends AbstractMockObservableService {
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
          provide: TodoTodayService, useValue: new MockTodoTodayService()
        },
        {
          provide: JobService, useValue: new MockJobService()
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
