import { TestBed } from '@angular/core/testing';
import {HttpTestingController,HttpClientTestingModule} from '@angular/common/http/testing'
import { PreferenceService } from './preference.service';

describe('PreferenceService', () => {
  let service: PreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
