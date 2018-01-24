import { TestBed, inject } from '@angular/core/testing';

import { SharedSessionStorageService } from './shared-session-storage.service';

describe('SharedSessionStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedSessionStorageService]
    });
  });

  it('should be created', inject([SharedSessionStorageService], (service: SharedSessionStorageService) => {
    expect(service).toBeTruthy();
  }));
});
