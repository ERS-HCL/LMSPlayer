import { TestBed, inject } from '@angular/core/testing';

import { HttphandlerService } from './httphandler.service';

describe('HttphandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttphandlerService]
    });
  });

  it('should be created', inject([HttphandlerService], (service: HttphandlerService) => {
    expect(service).toBeTruthy();
  }));
});
