import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GuestMessageService } from './guest-message.service';

describe('GuestMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      GuestMessageService
    ]
  }));

  it('should be created', () => {
    const service: GuestMessageService = TestBed.get(GuestMessageService);
    expect(service).toBeTruthy();
  });
});
