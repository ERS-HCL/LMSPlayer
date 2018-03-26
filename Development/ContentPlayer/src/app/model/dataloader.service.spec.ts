import { TestBed, inject } from '@angular/core/testing';

import { DataloaderService } from './dataloader.service';

describe('DataloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataloaderService]
    });
  });

  it('should be created', inject([DataloaderService], (service: DataloaderService) => {
    expect(service).toBeTruthy();
  }));
});
