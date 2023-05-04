import { TestBed } from '@angular/core/testing';

import { FilterConfigService } from './filter-config.service';

describe('FilterConfigService', () => {
  let service: FilterConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
