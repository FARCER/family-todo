import { TestBed } from '@angular/core/testing';

import { AfterAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AfterAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AfterAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
