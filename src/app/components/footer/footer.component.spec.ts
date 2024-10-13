import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, AlertService } from '@services/_index';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['error', 'info']);
    const authenServiceSpy = jasmine.createSpyObj('AuthService', ['isLogin']);
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authenServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
