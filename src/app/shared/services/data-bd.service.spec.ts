import { TestBed } from '@angular/core/testing';

import { DataBdService } from './data-bd.service';

describe('DataBdService', () => {
  let service: DataBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
