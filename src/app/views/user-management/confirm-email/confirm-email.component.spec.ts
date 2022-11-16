import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterEvent, ActivatedRoute } from '@angular/router';
import { AbstractMockObservableService } from '@helpers/mock.service';
import { AuthService } from '@app/_services/auth.service';
import { NavigationService } from '@services/_index';
import { of, ReplaySubject } from 'rxjs';

import { ConfirmEmailComponent } from './confirm-email.component';

class MockAuthService extends AbstractMockObservableService {
  confirmEmail() {
    return this;
  }
}
class MockNavigationService extends AbstractMockObservableService {
  gotoHome() {
    return this;
  }
}

describe('ConfirmEmailComponent', () => {
  let component: ConfirmEmailComponent;
  let fixture: ComponentFixture<ConfirmEmailComponent>;
  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  beforeEach(async () => {
    // const authServiceSpy = jasmine.createSpyObj('AuthService', ['confirmEmail']);
    // const NavigationServiceSpy = jasmine.createSpyObj('NavigationService', ['gotoHome']);
    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [ConfirmEmailComponent],
      providers: [
        { provide: AuthService, useValue: new MockAuthService() },
        { provide: NavigationService, useValue: new MockNavigationService() },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
            snapshot: {
              params: of({ id: 123 })
            }
          }
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
