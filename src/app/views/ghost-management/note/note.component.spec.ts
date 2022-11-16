import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { AbstractMockObservableService } from '@helpers/mock.service';
import { NoteService } from '@services/_index';
import { of, ReplaySubject } from 'rxjs';

import { NoteComponent } from './note.component';
class MockNoteService extends AbstractMockObservableService {
  addNote() {
    return this;
  }
  getMyNote() {
    return this;
  }
  updateNote() {
    return this;
  }
  deleteNote() {
    return this;
  }
}

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  beforeEach(async () => {
    routerEventReplaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventReplaySubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [
        NoteComponent,
      ],
      providers: [
        { provide: NoteService, useValue: new MockNoteService() },

        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
            queryParams: of({ id: 123 })
          }
        },
        ChangeDetectorRef,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
