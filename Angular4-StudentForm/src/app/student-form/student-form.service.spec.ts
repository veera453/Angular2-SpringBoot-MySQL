import { TestBed, inject } from '@angular/core/testing';

import { StudentFormService } from './student-form.service';

describe('StudentFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentFormService]
    });
  });

  it('should be created', inject([StudentFormService], (service: StudentFormService) => {
    expect(service).toBeTruthy();
  }));
});
