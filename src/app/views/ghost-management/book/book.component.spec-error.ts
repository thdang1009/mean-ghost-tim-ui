import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractMockObservableService } from '@app/_helpers/mock.service';
import { BookService } from '@app/_services/book.service';

import { BookComponent } from './book.component';

class MockBookService extends AbstractMockObservableService {
  getBook() {
    return this;
  }
  getMyBook() {
    return this;
  }
  addBook() {
    return this;
  }
  updateBook() {
    return this;
  }
  deleteBook() {
    return this;
  }
}
describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ],

      providers: [
        {
          provide: BookService, useValue: new MockBookService()
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
