import { TestBed } from '@angular/core/testing';

import { ContractingService } from './contracting.service';

describe('ContractingService', () => {
  let service: ContractingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
