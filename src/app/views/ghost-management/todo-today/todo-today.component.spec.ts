import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobService, TodoTodayService } from '@services/_index';

import { TodoTodayComponent } from './todo-today.component';

describe('TodoTodayComponent', () => {
  let component: TodoTodayComponent;
  let fixture: ComponentFixture<TodoTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoTodayComponent,
        { provide: TodoTodayService, useValue: {} },
        { provide: JobService, useValue: {} },
      ],
      imports: [

        TodoTodayService,
        JobService,
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
