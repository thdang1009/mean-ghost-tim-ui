import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoLabelService } from './todo-label.service';

describe('TodoLabelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TodoLabelService
    ]
  }));

  it('should be created', () => {
    const service: TodoLabelService = TestBed.get(TodoLabelService);
    expect(service).toBeTruthy();
  });
});
