import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractMockObservableService } from '@helpers/mock.service';
import { TodoLabelService } from '@services/_index';

import { TodoLabelListComponent } from './todo-label-list.component';
class MockTodoLabelService extends AbstractMockObservableService {
  getTodoLabels() {
    return this;
  }
}
describe('TodoLabelListComponent', () => {
  let component: TodoLabelListComponent;
  let fixture: ComponentFixture<TodoLabelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoLabelListComponent],
      providers: [
        { provide: TodoLabelService, useValue: new MockTodoLabelService() }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoLabelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
