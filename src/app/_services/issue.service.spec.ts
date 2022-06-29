import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IssueService } from './issue.service';

describe('IssueService', () => {

  beforeEach(() => {
    let injector: TestBed;
    let service: IssueService;
    let httpMock: HttpTestingController;
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IssueService
      ]
    });
  });

  it('should be created', () => {
    const service: IssueService = TestBed.get(IssueService);
    expect(service).toBeTruthy();
  });
});
