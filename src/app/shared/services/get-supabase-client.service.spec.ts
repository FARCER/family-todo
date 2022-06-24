import { TestBed } from '@angular/core/testing';

import { GetSupabaseClientService } from './get-supabase-client.service';

describe('GetSupabaseClientService', () => {
  let service: GetSupabaseClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSupabaseClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
