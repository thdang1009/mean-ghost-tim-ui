import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TKTService } from './tkt.service';

describe('TKTService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TKTService
    ]
  }));

  it('should be created', () => {
    const service: TKTService = TestBed.get(TKTService);
    expect(service).toBeTruthy();
  });
});
