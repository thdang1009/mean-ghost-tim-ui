import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { RouterEvent, Router, ActivatedRoute } from '@angular/router';
import { FileService, AlertService } from '@services/_index';
import { of, ReplaySubject } from 'rxjs';

import { AddFileComponent } from './add-file.component';

describe('AddFileComponent', () => {
  let component: AddFileComponent;
  let fixture: ComponentFixture<AddFileComponent>;

  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  beforeEach(async () => {
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['error']);
    const categoryServiceSpy = jasmine.createSpyObj('FileService', ['getFiles']);
    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [AddFileComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
            queryParams: of({ id: 123 })
          },
        },
        UntypedFormBuilder,
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerMock },
        { provide: FileService, useValue: categoryServiceSpy }

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
