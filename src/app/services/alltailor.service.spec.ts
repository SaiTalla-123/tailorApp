import { TestBed } from '@angular/core/testing';

import { AlltailorService } from './alltailor.service';
import { HttpClientModule } from '@angular/common/http';

describe('AlltailorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: AlltailorService = TestBed.get(AlltailorService);
    expect(service).toBeTruthy();
  });
});
