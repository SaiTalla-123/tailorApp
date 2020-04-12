import { TestBed } from '@angular/core/testing';

import { AddUserService } from './add-user.service';
import { HttpClientModule } from '@angular/common/http';

describe('AddUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: AddUserService = TestBed.get(AddUserService);
    expect(service).toBeTruthy();
  });
});
