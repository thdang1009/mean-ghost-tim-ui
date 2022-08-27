import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { UserService } from '@services/_index';

import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['sendGuestMessage']);
    await TestBed.configureTestingModule({
      declarations: [
        AboutMeComponent,
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        UntypedFormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
