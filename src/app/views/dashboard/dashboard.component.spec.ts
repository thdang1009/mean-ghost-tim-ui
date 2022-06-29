import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UnitConversionPipe } from '@pipes/_index';
import { AnalyticService } from '@services/analytic.service';
import { IssueService } from '@services/issue.service';
import { TodoTodayService } from '@services/todo-today.service';
import { UserService } from '@services/user.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {

    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    const tdtdServiceSpy = jasmine.createSpyObj('TodoTodayService', ['getMyTodoToday', 'deleteTodoToday', 'updateTodoToday']);
    const analyticServiceSpy = jasmine.createSpyObj('AnalyticService', ['getStoragedSpace', 'getTotalAccess']);
    const issueServiceSpy = jasmine.createSpyObj('IssueService', ['getIssues']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        UnitConversionPipe
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TodoTodayService, useValue: tdtdServiceSpy },
        { provide: AnalyticService, useValue: analyticServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: IssueService, useValue: issueServiceSpy },
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
