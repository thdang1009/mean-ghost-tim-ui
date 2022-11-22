import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TagService } from './tag.service';

describe('TagService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TagService
    ]
  }));

  it('should be created', () => {
    const service: TagService = TestBed.get(TagService);
    expect(service).toBeTruthy();
  });
});
