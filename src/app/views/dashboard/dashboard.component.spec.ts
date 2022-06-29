import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AbstractMockObservableService } from '@helpers/mockservice.service';
import { UnitConversionPipe } from '@pipes/_index';
import { AnalyticService } from '@services/analytic.service';
import { IssueService } from '@services/issue.service';
import { TodoTodayService } from '@services/todo-today.service';
import { UserService } from '@services/user.service';

import { DashboardComponent } from './dashboard.component';
class _TodoTodayService extends AbstractMockObservableService {
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
class _AnalyticService extends AbstractMockObservableService {
  getStoragedSpace() {
    return this;
  }
  getTotalAccess() {
    return this;
  }
}
class _UserService extends AbstractMockObservableService {
  getUsers() {
    return this;
  }
}
class _IssueService extends AbstractMockObservableService {
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
        { provide: UserService, useValue: new _UserService() },
        { provide: TodoTodayService, useValue: new _TodoTodayService() },
        { provide: AnalyticService, useValue: new _AnalyticService() },
        { provide: Router, useValue: routerSpy },
        { provide: IssueService, useValue: new _IssueService() },
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
