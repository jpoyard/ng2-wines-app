import { TestBed, inject } from '@angular/core/testing';

import { OxCountriesService } from './ox-countries.service';

describe('OxCountriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OxCountriesService]
    });
  });

  it('should be created', inject([OxCountriesService], (service: OxCountriesService) => {
    expect(service).toBeTruthy();
  }));
});
