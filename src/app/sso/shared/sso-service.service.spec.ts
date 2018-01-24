import { TestBed, inject } from '@angular/core/testing';

import { SsoServiceService } from './sso-service.service';

describe('SsoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SsoServiceService]
    });
  });

  it('should be created', inject([SsoServiceService], (service: SsoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
