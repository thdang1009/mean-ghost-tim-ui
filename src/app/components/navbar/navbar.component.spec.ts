import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { Router, RouterEvent } from '@angular/router';
import { ElementRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';
//ElementRef

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  beforeEach(async(() => {
    const locationSpy = jasmine.createSpyObj('Location', ['prepareExternalUrl', 'back', 'path', 'subscribe']);
    const elementRefSpy = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: ElementRef, useValue: elementRefSpy },
        { provide: Router, useValue: routerMock },
        { provide: Location, useValue: locationSpy
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
