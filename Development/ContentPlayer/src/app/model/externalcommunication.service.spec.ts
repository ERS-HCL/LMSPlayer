import { TestBed, inject } from '@angular/core/testing';

import { ExternalcommunicationService } from './externalcommunication.service';

describe('ExternalcommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalcommunicationService]
    });
  });

  it('should be created', inject([ExternalcommunicationService], (service: ExternalcommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
