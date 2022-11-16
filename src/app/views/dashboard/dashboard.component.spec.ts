import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AbstractMockObservableService } from '@helpers/mock.service';
import { UnitConversionPipe } from '@pipes/_index';
import { AnalyticService } from '@services/analytic.service';
import { IssueService } from '@services/issue.service';
import { TodoTodayService } from '@services/todo-today.service';
import { UserService } from '@services/user.service';

import { DashboardComponent } from './dashboard.component';
class MockTodoTodayService extends AbstractMockObservableService {
  getMyTodoToday() {
    return this;
  }
  deleteTodoToday() {
    return this;
  }
  updateTodoToday() {
    return this;
  }
}
class MockAnalyticService extends AbstractMockObservableService {
  getStoragedSpace() {
    return this;
  }
  getTotalAccess() {
    return this;
  }
}
class MockUserService extends AbstractMockObservableService {
  getUsers() {
    return this;
  }
}
class MockIssueService extends AbstractMockObservableService {
  getIssues() {
    return this;
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        UnitConversionPipe
      ],
      providers: [
        { provide: UserService, useValue: new MockUserService() },
        { provide: TodoTodayService, useValue: new MockTodoTodayService() },
        { provide: AnalyticService, useValue: new MockAnalyticService() },
        { provide: Router, useValue: routerSpy },
        { provide: IssueService, useValue: new MockIssueService() },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
