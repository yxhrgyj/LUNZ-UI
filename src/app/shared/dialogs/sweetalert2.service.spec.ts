import { TestBed, inject } from '@angular/core/testing';

import { Sweetalert2Service } from './sweetalert2.service';

describe('Sweetalert2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Sweetalert2Service]
    });
  });

  it('should be created', inject([Sweetalert2Service], (service: Sweetalert2Service) => {
    expect(service).toBeTruthy();
  }));
});
