import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractMockObservableService } from '@helpers/mockservice.service';
import { UserService } from '@services/_index';

import { UserListComponent } from './user-list.component';
class _UserService extends AbstractMockObservableService {
  getUsers() {
    return this;
  }
}
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [
        { provide: UserService, useValue: new _UserService()}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
