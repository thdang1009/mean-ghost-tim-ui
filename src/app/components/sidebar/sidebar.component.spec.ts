import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { AuthService } from '@services/_index';
import { of, ReplaySubject } from 'rxjs';
import { RouterEvent, Router } from '@angular/router';
import { AbstractMockObservableService } from '@helpers/mockservice.service';
import { EventEmitter } from '@angular/core';

class _AuthService extends AbstractMockObservableService {
  isLoggedIn = new EventEmitter<any>();
  isLogin() {
    return this;
  }
  isAdmin() {
    return this;
  }
  isGrandAdmin() {
    return this;
  }
  isMember() {
    return this;
  }
  getUserInfo() {
    return this;
  }
  logout() {
    return this;
  }
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  beforeEach(async(() => {
    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      providers: [
        { provide: AuthService, useValue: new _AuthService()},
        { provide: Router, useValue: routerMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
