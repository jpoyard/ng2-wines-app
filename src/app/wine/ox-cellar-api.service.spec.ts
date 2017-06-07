import { TestBed, inject } from '@angular/core/testing';

import { OxCellarApiService } from './ox-cellar-api.service';

describe('OxCellarApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OxCellarApiService]
    });
  });

  it('should be created', inject([OxCellarApiService], (service: OxCellarApiService) => {
    expect(service).toBeTruthy();
  }));
});
