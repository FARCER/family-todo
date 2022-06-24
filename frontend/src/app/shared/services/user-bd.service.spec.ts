import { TestBed } from '@angular/core/testing';

import { UserBdService } from './user-bd.service';

describe('UserBdService', () => {
  let service: UserBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
