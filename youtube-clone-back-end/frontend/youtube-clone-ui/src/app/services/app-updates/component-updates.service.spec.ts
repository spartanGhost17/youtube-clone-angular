import { TestBed } from '@angular/core/testing';

import { ComponentUpdatesService } from './component-updates.service';

describe('ComponentUpdatesService', () => {
  let service: ComponentUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
