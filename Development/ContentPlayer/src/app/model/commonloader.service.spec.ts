import { TestBed, inject } from '@angular/core/testing';

import { CommonloaderService } from './commonloader.service';

describe('CommonloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonloaderService]
    });
  });

  it('should be created', inject([CommonloaderService], (service: CommonloaderService) => {
    expect(service).toBeTruthy();
  }));
});
