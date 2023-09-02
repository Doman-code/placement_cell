import { TestBed } from '@angular/core/testing';

import { CompanyDashboardGuard } from './company-dashboard.guard';

describe('CompanyDashboardGuard', () => {
  let guard: CompanyDashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompanyDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
