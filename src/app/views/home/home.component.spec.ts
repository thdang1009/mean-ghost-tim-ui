import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@services/auth.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    const authenServiceSpy = jasmine.createSpyObj('AuthService', ['isLogin']);
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authenServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
