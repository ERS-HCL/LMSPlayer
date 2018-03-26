import { TestBed, inject } from '@angular/core/testing';

import { ApplicationmodelService } from './applicationmodel.service';

describe('ApplicationmodelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationmodelService]
    });
  });

  it('should be created', inject([ApplicationmodelService], (service: ApplicationmodelService) => {
    expect(service).toBeTruthy();
  }));
});
