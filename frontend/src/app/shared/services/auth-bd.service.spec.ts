import { TestBed } from '@angular/core/testing';

import { AuthBdService } from './auth-bd.service';

describe('AuthBdService', () => {
  let service: AuthBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
