import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractMockObservableService } from '@helpers/mock.service';
import { AuthService } from '@services/_index';

import { LogoutComponent } from './logout.component';
class MockAuthService extends AbstractMockObservableService {
  logout() {
    return this;
  }
}

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LogoutComponent,
      ],
      providers: [
        { provide: AuthService, useValue: new MockAuthService() }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
